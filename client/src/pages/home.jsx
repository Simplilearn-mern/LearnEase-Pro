import pascalImage from "../assets/pascal.jpg";
import nodeImage from "../assets/node.jpg";
import phpImage from "../assets/php.jpg";
import reactImage from "../assets/react.svg";
import "../components/navbar.css";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center">
        Welcome to the Home! </h1>
      <div className="min-h-screen flex justify-center">
        <div className="h-5 w-5 pt-10  bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${pascalImage})` }}
        />
        <div className="h-5 w-5 pt-10 bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${nodeImage})` }}
        />
        <div className="h-5 w-5 pt-4  bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${phpImage})` }}
        />
        <div className="h-5 w-5 pt-10  bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${reactImage})` }}
        />
        <div className="h-5 w-5 pt-10  bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${pascalImage})` }}
        />
        <div className="h-5 w-5 pt-10  bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${nodeImage})` }}
        />
        <div className="h-5 w-5 pt-10  bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${phpImage})` }}
        />
        <div className="h-5 w-5 pt-10  bg-contain bg-no-repeat bg-center homepgeImage"
          style={{ backgroundImage: `url(${reactImage})` }}
        />

      </div>
    </>
  );
}