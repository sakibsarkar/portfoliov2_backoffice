export interface IFrontViewPayload {
  logo: string;
  primaryBannerImg: string[];
  secondaryBannerImg: string[];
  whatsappStatus: boolean;
  topButton: {
    text: string;
    link: string;
    color: string;
  };
  background: {
    type: string;
    image?: string;
    color?: string;
  };
}
