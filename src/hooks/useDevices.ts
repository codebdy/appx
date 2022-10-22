import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Device } from "@rxdrag/appx-plugin-sdk";

export interface IDevice {
  key: string;
  name: string;
  imageUrl: string;
}

export function useDevices() {
  const { t } = useTranslation();
  const devices: IDevice[] = useMemo(() => {
    return [
      {
        key: Device.PC,
        name: t("Devices." + Device.PC),
        imageUrl: "/public/img/pc.svg",
      },
      {
        key: Device.Mobile,
        name: t("Devices." + Device.Mobile),
        imageUrl: "/public/img/mobile.png",
      },
      {
        key: Device.Website,
        name: t("Devices." + Device.Website),
        imageUrl: "/public/img/website.png",
      },
    ];
  }, [t]);

  return devices;
}