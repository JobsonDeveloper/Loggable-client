export const Wallpaper = () => {
  return (
    <ul className="bg-blue-400 h-[600px] w-80 relative">
      <li className="absolute top-0 w-full p-2">
        <img src="/loggableLogo.png" alt="Loggable Logo" className="w-24" />
      </li>

      <li className="absolute bottom-5 w-full px-2 text-end text-white text-lg">
        &ldquo;Sempre prezando por sua autenticação com segurança&rdquo;
      </li>

      <li className="h-full">
        <img
          src="/wallpaperImage.png"
          alt="Wallpaper image"
          className="h-full object-cover"
        />
      </li>
    </ul>
  );
};
