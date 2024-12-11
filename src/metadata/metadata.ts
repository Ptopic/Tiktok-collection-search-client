import { Metadata } from 'next';

import config from '@shared/config';
import { siteConfig } from '@shared/config/siteConfig';

import { openGraphImage } from './openGraphImage';

const metadata: Metadata = {
  metadataBase: new URL(config.websiteUrl),
  title: siteConfig.websiteTitle,
  description: siteConfig.websiteDescription,
  icons: [
    {
      url: 'https://www.aitech.io/wp-content/uploads/2023/06/cropped-android-chrome-512x512-1-32x32.png',
    },
  ],
  openGraph: {
    siteName: siteConfig.websiteTitle,
    title: siteConfig.websiteTitle,
    type: 'website',
    url: config.websiteUrl,
    ...openGraphImage,
  },
};

export default metadata;
