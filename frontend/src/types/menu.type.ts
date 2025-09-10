export type NavItem = {
  label: string;
  href?: string;
  description?: string;
  badge?: string;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
    badge?: string;
  }>;
  mega?: Array<{
    title: string;
    items: Array<{
      label: string;
      href: string;
      description?: string;
      badge?: string;
    }>;
  }>;
};
