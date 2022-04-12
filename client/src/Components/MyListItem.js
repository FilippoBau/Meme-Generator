import { useState } from "react";

import { Meme } from "./Meme.js";
import InfoModal from "./InfoModal";
import AddModal from "./AddModal.js";

function MyListItem(props) {
  const [infoModalShow, setinfoModalShow] = useState(false);
  const [copyModalShow, setcopyModalShow] = useState(false);

  const meme = props.item;
  return (
    <>
      <Meme
        iduser={props.iduser}
        image={meme}
        setinfoModalShow={setinfoModalShow}
        setcopyModalShow={setcopyModalShow}
        deleteMeme={props.deleteMeme}
        setdeleting={props.setdeleting}
        deleting={props.deleting}
        adding={props.adding}
        username={props.username}
        id={props.id}
        seterr={props.seterr}
        seterrshow={props.seterrshow}
      />

      <InfoModal
        infoModalShow={infoModalShow}
        setinfoModalShow={setinfoModalShow}
        meme={meme}
      />

      {copyModalShow && (
        <AddModal
          iduser={props.iduser}
          meme={meme}
          oldBool={meme.protect}
          addModalShow={copyModalShow}
          setAddModalShow={setcopyModalShow}
          setprocessing={props.setprocessing}
          addMeme={props.addMeme}
        />
      )}
    </>
  );
}

export default MyListItem;
