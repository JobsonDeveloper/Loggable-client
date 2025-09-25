import { GlobalProviders } from "@/app/GlobalProviders";
import { Wallpaper } from "@/components/login/Wallpaper";
import { Form } from "@/components/login/Form";

export default function Login() {
  return (
    <GlobalProviders>
      <section className="lg:p-4 bg-gray-50 h-screen flex items-center justify-center">
        <article className="max-h-[600px] flex gap-2 w-max overflow-hidden rounded-lg bg-white shadow-lg">
          <Wallpaper />
          <Form />
        </article>
      </section>
    </GlobalProviders>
  );
}
