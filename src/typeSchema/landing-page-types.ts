import type { LucideProps } from "lucide-react";

export interface NavbarItem {
  name: string;
  url: string;
}

export interface testimonialItemTypes {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  imgUrl: string;
  altImg: string;
  title: string;
  desc: string;
  reviewer: string;
  occupancy: string;
}
