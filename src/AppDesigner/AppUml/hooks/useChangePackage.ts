import { useCallback } from "react"
import { useSetRecoilState } from "recoil";
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid";
import { PackageMeta } from "../meta/PackageMeta";
import { packagesState } from "../recoil/atoms";

export function useChangePackage() {
  const appUuid = useEdittingAppId();
  const setPackages = useSetRecoilState(packagesState(appUuid));
  const change = useCallback((pkg: PackageMeta) => {
    setPackages(packages => packages.map(pg => pg.uuid === pkg.uuid ? pkg : pg))
  }, [])

  return change;
}