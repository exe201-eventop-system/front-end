import { PackageResponseDto } from "../../types/Packages/packages";
import { createGetThunk } from "../genericsCreateThunk";

export const getPackages = createGetThunk<PackageResponseDto[], void>(
    "packages/",
    "package-structure"
);
