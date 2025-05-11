import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PlusCircle, Edit3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '@/config/apiConstants'; // <-- IMPORT THE CONSTANTS

// Define a type for our brand kit data
interface BrandKit {
  id: string;
  user_id: string; 
  name: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;    
  default_font?: string;    
  domain?: string; // This can store the main domain from the company_url
  company_url?: string; // New field for the full company website URL
  industry?: string;
  created_at?: string; 
  updated_at?: string; 
}

export function BrandKitPage() {
  const { user } = useAuth();
  const [brandKits, setBrandKits] = useState<BrandKit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [kitName, setKitName] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [logoLinkUrl, setLogoLinkUrl] = useState(''); 
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [accentColor, setAccentColor] = useState('');
  const [defaultFont, setDefaultFont] = useState('');
  const [domain, setDomain] = useState(''); // Will be auto-filled or manually entered
  const [companyUrlInput, setCompanyUrlInput] = useState(''); // New state for company URL input
  const [industry, setIndustry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false); // For loading state of autofill

  useEffect(() => {
    const fetchBrandKits = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('brand_kits') // Make sure this table exists in Supabase
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        setBrandKits(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching brand kits:", err);
      }
      setLoading(false);
    };

    fetchBrandKits();

    // Cleanup function for logoPreviewUrl
    return () => {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
    };
  }, [user, logoPreviewUrl]); // Added logoPreviewUrl to dependency array for cleanup

  const resetForm = () => {
    setKitName('');
    setPrimaryColor('');
    setSecondaryColor('');
    setAccentColor('');
    setDefaultFont('');
    setDomain('');
    setCompanyUrlInput(''); // <-- RESET COMPANY URL INPUT
    setIndustry('');
    setLogoFile(null);
    setLogoPreviewUrl(null); 
    setLogoLinkUrl(''); 
    setShowForm(false);
    setError(null);
    setIsFetchingDetails(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setLogoFile(file);
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl); 
    }
    if (file) {
      setLogoPreviewUrl(URL.createObjectURL(file));
      setLogoLinkUrl(''); // Clear link URL if a file is chosen
    } else {
      setLogoPreviewUrl(null);
    }
  };

  const handleLogoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setLogoLinkUrl(link);
    if (link) {
      setLogoFile(null); // Clear file if a link is entered
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
        setLogoPreviewUrl(null);
      }
    }
  };

  const handleFetchCompanyDetails = async () => {
    if (!companyUrlInput) {
      setError("Please enter a company website URL.");
      return;
    }
    setIsFetchingDetails(true);
    setError(null);
    console.log(`Fetching details for: ${companyUrlInput} using FastAPI backend`);

    try {
      const response = await fetch(API_ENDPOINTS.scrapeDetails, { // <-- USE THE CONSTANT HERE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: companyUrlInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error occurred" }));
        throw new Error(`Backend error: ${response.status} ${response.statusText} - ${errorData.detail || 'No additional details'}`);
      }

      const fetchedData = await response.json();

      console.log("Data from FastAPI backend:", fetchedData);

      setKitName(fetchedData.name || kitName);
      if (fetchedData.logo_url) {
        setLogoLinkUrl(fetchedData.logo_url);
        setLogoFile(null);
        if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
        setLogoPreviewUrl(fetchedData.logo_url); // Directly use the fetched URL for preview
      }
      setPrimaryColor(fetchedData.primary_color || primaryColor);
      setDomain(fetchedData.domain || domain);

    } catch (fetchError: any) {
      console.error("Error fetching company details via FastAPI:", fetchError);
      setError(`Failed to fetch details: ${fetchError.message}`);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleCreateKit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !kitName) {
      setError("Brand Kit Name is required.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    let finalLogoUrl: string | undefined = undefined; 

    try {
      // 1. Handle File Upload if a new file is selected (takes precedence)
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const justFileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${user.id}/${justFileName}`; 

        const { error: uploadError } = await supabase.storage
          .from('brand-logos') 
          .upload(filePath, logoFile, {
            cacheControl: '3600',
            upsert: false, 
          });

        if (uploadError) {
          throw new Error(`Logo upload failed: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from('brand-logos') 
          .getPublicUrl(filePath);
        
        if (!urlData || !urlData.publicUrl) {
            throw new Error('Could not get public URL for logo.');
        }
        finalLogoUrl = urlData.publicUrl;
      } else if (logoLinkUrl) {
        // 2. Use direct link if no file is uploaded but a link is provided
        finalLogoUrl = logoLinkUrl;
      }

      // 3. Prepare Brand Kit Data
      const newKitData: Omit<BrandKit, 'id' | 'created_at' | 'updated_at'> = {
        user_id: user.id,
        name: kitName,
        logo_url: finalLogoUrl, 
        primary_color: primaryColor || undefined,
        secondary_color: secondaryColor || undefined,
        accent_color: accentColor || undefined,
        default_font: defaultFont || undefined,
        domain: domain || (companyUrlInput ? new URL(companyUrlInput).hostname : undefined), // Store domain from input or fetched URL
        company_url: companyUrlInput || undefined, // Store the full company URL used for fetching
        industry: industry || undefined,
      };

      // 3. Insert Brand Kit Data
      const { data: insertedData, error: insertError } = await supabase
        .from('brand_kits')
        .insert([newKitData])
        .select();

      if (insertError) throw insertError;

      if (insertedData) {
        setBrandKits([...brandKits, insertedData[0]]);
        resetForm(); 
        // setLogoUrl(''); // Not needed here anymore, resetForm handles relevant fields
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error creating brand kit:", err);
    }
    setIsSubmitting(false);
  };

  if (loading) return <div className="p-6">Loading brand kits...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Brand Kits</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <PlusCircle className="mr-2 h-4 w-4" /> {showForm ? 'Cancel' : 'Create New Kit'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Brand Kit</CardTitle>
            <CardDescription>Define your brand's visual identity. Fields marked with * are required.</CardDescription>
          </CardHeader>
          <form onSubmit={handleCreateKit}>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/20">
                <Label htmlFor="companyUrlInput">Company Website URL (for Autofill)</Label>
                <div className="flex space-x-2 mt-1">
                  <Input 
                    id="companyUrlInput" 
                    type="url" 
                    value={companyUrlInput}
                    onChange={(e) => setCompanyUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    disabled={isFetchingDetails}
                  />
                  <Button 
                    type="button" 
                    onClick={handleFetchCompanyDetails} 
                    disabled={isFetchingDetails || !companyUrlInput}
                  >
                    {isFetchingDetails ? 'Fetching...' : 'Fetch Details'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Enter your company's website to attempt autofilling details below.</p>
              </div>

              <div className="pt-4">
                <Label htmlFor="kitName">Brand Kit Name *</Label>
                <Input id="kitName" value={kitName} onChange={(e) => setKitName(e.target.value)} placeholder="e.g., My Awesome Brand" required />
              </div>
              
              <div>
                <Label htmlFor="logoFile">Logo Image</Label>
                <Input 
                  id="logoFile" 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/png, image/jpeg, image/svg+xml, image/gif"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {/* Display preview of newly selected file */} 
                {logoPreviewUrl && (
                    <div className="mt-2">
                        <p className="text-xs text-muted-foreground">New logo preview:</p>
                        <img src={logoPreviewUrl} alt="New logo preview" className="w-16 h-16 object-contain border rounded" />
                    </div>
                )}
                {logoFile && !logoPreviewUrl && (
                    <p className="text-xs text-muted-foreground mt-1">Selected: {logoFile.name}</p>
                )}
              </div>

              <div className="my-4">
                <p className="text-sm text-center text-muted-foreground">OR</p>
              </div>

              <div>
                <Label htmlFor="logoLinkUrl">Paste Image URL</Label>
                <Input 
                  id="logoLinkUrl" 
                  type="url" 
                  value={logoLinkUrl}
                  onChange={handleLogoLinkChange}
                  placeholder="https://example.com/logo.png"
                />
                {/* Display preview if URL is pasted and no file is selected for upload */} 
                {logoLinkUrl && !logoFile && (
                    <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Logo from URL:</p>
                        <img src={logoLinkUrl} alt="Logo from URL" className="w-16 h-16 object-contain border rounded" />
                    </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4"> {/* Added pt-4 for spacing */}
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input id="primaryColor" type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input id="secondaryColor" type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <Input id="accentColor" type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="defaultFont">Default Font</Label>
                <Input id="defaultFont" value={defaultFont} onChange={(e) => setDefaultFont(e.target.value)} placeholder="e.g., Inter, Roboto" />
              </div>
              <div>
                <Label htmlFor="domain">Company Domain</Label>
                <Input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="e.g., example.com" />
              </div>
              <div>
                <Label htmlFor="industry">Industry / Business Category</Label>
                <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g., SaaS, E-commerce, Fashion" />
              </div>
              {error && <p className="text-sm text-red-600">Error: {error}</p>}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Brand Kit'}
                </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {brandKits.length === 0 && !showForm && (
        <p className="text-muted-foreground">You haven't created any brand kits yet. Get started by creating one!</p>
      )}

      {brandKits.length > 0 && (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {brandKits.map((kit) => (
             <Card key={kit.id}>
               <CardHeader>
                 <CardTitle>{kit.name}</CardTitle>
                 {kit.logo_url && <img src={kit.logo_url} alt={`${kit.name} logo`} className="w-16 h-16 mt-2 object-contain"/>}
               </CardHeader>
               <CardContent className="space-y-2">
                 {kit.primary_color && <p className="text-sm flex items-center">Primary: <span style={{ backgroundColor: kit.primary_color }} className="inline-block w-4 h-4 rounded-full border ml-2 mr-1"></span> {kit.primary_color}</p>}
                 {kit.secondary_color && <p className="text-sm flex items-center">Secondary: <span style={{ backgroundColor: kit.secondary_color }} className="inline-block w-4 h-4 rounded-full border ml-2 mr-1"></span> {kit.secondary_color}</p>}
                 {kit.accent_color && <p className="text-sm flex items-center">Accent: <span style={{ backgroundColor: kit.accent_color }} className="inline-block w-4 h-4 rounded-full border ml-2 mr-1"></span> {kit.accent_color}</p>}
                 {kit.default_font && <p className="text-sm">Font: {kit.default_font}</p>}
                 {kit.domain && <p className="text-sm">Domain: {kit.domain}</p>}
                 {kit.industry && <p className="text-sm">Industry: {kit.industry}</p>}
               </CardContent>
               <CardFooter className="flex justify-end space-x-2">
                 <Button variant="outline" size="sm"><Edit3 className="mr-1 h-3 w-3" /> Edit</Button>
                 <Button variant="destructive" size="sm"><Trash2 className="mr-1 h-3 w-3" /> Delete</Button>
               </CardFooter>
             </Card>
           ))}
         </div>
      )}
      <div className="mt-8">
         <Link to="/dashboard">
             <Button variant="outline">Back to Dashboard</Button>
         </Link>
      </div>
    </div>
  );
}
