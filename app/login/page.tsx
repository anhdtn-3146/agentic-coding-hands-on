import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import SiteHeader from "@/components/login/site-header";
import HeroSection from "@/components/login/hero-section";
import SiteFooter from "@/components/login/site-footer";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
  variable: "--font-montserrat",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat-alternates",
});

export const metadata: Metadata = {
  title: "Đăng nhập | Sun* Annual Awards 2025",
  description: "Đăng nhập vào SAA 2025 bằng tài khoản Google.",
};

export default function LoginPage() {
  return (
    <div
      className={`${montserrat.variable} ${montserratAlternates.variable} relative min-h-screen w-full bg-[#00101A]`}
    >
      <SiteHeader />
      <HeroSection />
      <SiteFooter />
    </div>
  );
}
