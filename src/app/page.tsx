import {AppProps} from 'next/app';
import RootLayout from "@/app/layout";
import {router} from "next/client";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    const isLoginRoute = router.pathname === '/login';
    return isLoginRoute ? (
        <Component {...pageProps} />
    ) : (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default MyApp;