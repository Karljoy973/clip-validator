import { useState } from "react";

const ClipInput = () => {
const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [clipStore, setClipStore] = useState<{ title: string; link: string }[]>(
    [],
  );
  const [linkExist, setLinkExist] = useState<boolean>(false);

  const handleSave = () => {
    //je commence par vérifier si la valeur courante de input est présente, si oui je break, sinon je continue.
    const existingTitle = clipStore.find((value) => value.title == title);
    if (!!existingTitle) {
      setLinkExist(true);
      setLink("");
      setTitle("");
      return;
    }

    const existingLink = clipStore.find((value) => value.link == link);
    if (!!existingLink) {
      setLinkExist(true);
      setLink("");
      setTitle("");
      return;
    }

    const clipPattern = new RegExp(`https://www.twitch.tv/[^/]+/clip/([^/]+)`);
    if (!!link.match(clipPattern)) {
      setClipStore((clipStore) => [...clipStore, {title, link}]);
    }
    setLink("");
    setTitle("");
  };

  return (
    <>
      <div className="clip-element flex flex-col items-center-safe justify-center-safe">
        <label htmlFor="clip-input" className="my-4">
          Titre du clip{" "}
        </label>
        <input
          type="text"
          name="clip-input"
          id="clip-input"
          className="rounded-md 
          w-4/12
          h-11
          border-2
          px-4
          mb-4
          border-purple-800
          focus:border-purple-700
          focus:shadow-md
          focus:outline-solid
          focus:outline-purple-700
          shadow-purple-700/45
          "
          placeholder="Vallheim Le Roi des Golems !"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="clip-input" className="my-4">
          Enregistrer un clip{" "}
        </label>
        <input
          type="text"
          name="clip-input"
          id="clip-input"
          className="
          rounded-md 
          w-9/12
          h-11
          border-2
          px-4
          mb-4
          border-purple-800
          focus:border-purple-700
          focus:shadow-md
          focus:outline-solid
          focus:outline-purple-700
          shadow-purple-700/45
          "
          placeholder="https://www.twitch.tv/vallheimlol/clip/..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {linkExist && (
          <p className="text-red-600 mb-2">This link is already registered !</p>
        )}
        <button
          onClick={handleSave}
          type="button"
          className="bg-purple-800 hover:bg-purple-900 text-white text-lg font-semibold px-3 py-2 rounded-lg"
        >
          Sauvegarder ce clip !
        </button>
      </div>
    </>
  );
}
 
export default ClipInput;