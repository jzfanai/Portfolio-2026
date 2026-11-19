export const SITE_CONFIG = {
  brand: 'JZFANAI',
  name: 'Jonathan Fanai',
  title: 'SEO Specialist',
  organization: 'ESKO Graphics Pvt. Ltd.',
  organizationShort: 'ESKO',
  age: 29,
  location: {
    city: 'Bangalore, IN',
    cityFull: 'Bangalore, Karnataka',
    street: 'JP Nagar 1st Phase',
    postalCode: '560060',
  },
  contact: {
    email: 'jzfanai@gmail.com',
    phoneDisplay: '+91 88372 38364',
    phoneHref: '+918837238364',
  },
  intro: {
    greetingPrefix: "Hi, I'm",
    greetingName: 'JONATHAN',
    bioSegments: [
      { text: 'SEO Specialist currently working as a contractor for ESKO Graphics Pvt. Ltd., Bangalore. I have a total of ', accent: false },
      { text: '2+', accent: true },
      { text: ' years of Experience in Organic Marketing and Brand building. I have extensive ', accent: false },
      { text: 'SAAS Marketing', accent: true },
      { text: ' knowledge along with Real estate SEO. I have experience in International SEO across ', accent: false },
      { text: 'NATAM, LATAM, EMEA and APAC', accent: true },
      { text: '.', accent: false },
    ],
  },
  tagline: 'WHERE MARKETING, ENGINEERING & CREATIVITY MEETS',
  copyrightYear: 2019,
  canonicalUrl: 'https://jzfanai.com/',
  /**
   * Local bundled PDF sourced from the supplied Google Drive link,
   * paired with direct Drive download & view links.
   */
  cvPdfUrl: '/assets/documents/Jonathan_Fanai_CV.pdf',
  cvFileName: 'Jonathan_Fanai_CV.pdf',
  cvGoogleDriveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1oxZytNix2OV3DyaqzR9Mbg2ySOOdbkK7',
  cvGoogleDriveViewUrl: 'https://drive.google.com/file/d/1oxZytNix2OV3DyaqzR9Mbg2ySOOdbkK7/view?usp=sharing',
  /**
   * Configure your email marketing provider endpoint (e.g. ConvertKit, Mailchimp, Resend)
   * when integrating backend newsletter subscriptions.
   */
  newsletterEndpoint: null as string | null,
} as const;
