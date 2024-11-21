import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="grid min-h-screen w-full grid-cols-12">
        <div className="relative col-span-12 flex flex-col justify-center lg:col-span-6 xl:col-span-6">
          <div className="m-5 flex justify-center lg:absolute lg:left-0 lg:top-0">
            <Link href="/">
              <Image
                alt="logo"
                src="/assets/images/static/silab-light.png"
                width={72.66}
                height={32}
                className="block dark:hidden"
                priority
              />
            </Link>
            <Link href="/">
              <Image
                alt="logo"
                src="/assets/images/static/silab-dark.png"
                width={72.66}
                height={32}
                className="hidden dark:block"
                priority
              />
            </Link>
          </div>

          <div className="lg:mx-20">{children}</div>

          <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#EEEEEF_1px,transparent_1px),linear-gradient(to_bottom,#EEEEEF_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#1F1F1F_1px,transparent_1px),linear-gradient(to_bottom,#1F1F1F_1px,transparent_1px)] lg:hidden"></div>
        </div>
        <div className="my-5 mr-5 hidden animate-fade overflow-hidden animate-delay-500 animate-duration-1000 animate-ease-in-out lg:col-span-6 lg:block xl:col-span-6">
          <Image
            src="/assets/images/static/hero.jpg"
            width={871}
            height={942}
            alt="hero image"
            className="h-[calc(100vh-40px)] w-full object-cover brightness-90 transition-transform duration-700 hover:scale-110"
            priority
          />
        </div>
      </main>
    </>
  );
}
