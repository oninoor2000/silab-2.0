import type { LucideProps } from "lucide-react";

export type NavbarItem = {
  name: string;
  url: string;
};

export type testimonialItemTypes = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  imgUrl: string;
  altImg: string;
  title: string;
  desc: string;
  reviewer: string;
  occupancy: string;
};
