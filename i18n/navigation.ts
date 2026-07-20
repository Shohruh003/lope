import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers around next/link + useRouter that automatically inject
// the current locale into the URL. Use these instead of the plain
// next/navigation exports inside components rendered under
// `app/[locale]/`.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
