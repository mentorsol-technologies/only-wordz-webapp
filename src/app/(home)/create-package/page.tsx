import CreatePackage from "@/components/CreatePackage";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <CreatePackage />
        </Suspense>
    );
}
