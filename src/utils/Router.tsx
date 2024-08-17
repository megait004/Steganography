// src/routes.tsx (or a similar file)
import AboutMe from "@pages/about-me";
import Create from "@pages/create";
import Index from "@pages/index";
import Layout from "@pages/layout";
import MobilePage from "@pages/mobile-page";
import MyImage from "@pages/my-image";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";

const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="create" element={<Create />} />
        <Route path="about-me" element={<AboutMe />} />
        <Route path="my-image" element={<MyImage />} />
        <Route path="mobile" element={<MobilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Route>,
);

const router = createBrowserRouter(routes);
export default router;
