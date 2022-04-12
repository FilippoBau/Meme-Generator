//@ts-check
import { Col, Row } from "react-bootstrap";
import MyList from "./MyList";
import AddButton from "./AddButton";
import AddModal from "./AddModal";
import { useState, useEffect } from "react";
import { createNewMeme } from "../Api/PostApi";
import { getFilter } from "../Api/GetApi";
import { deleteById } from "../Api/DeleteApi";
import ErrorAlert from "./ErrorAlert";
import LoadingOverlay from "./LoadingOverlay";
import RefreshButton from "./RefreshButton";
import { Memeconstr } from "../data/MyData.js";
import ErrorMessage from "./ErrorMessage";

export default function Body({ ...props }) {
  const { check, userName, isLogged, iduser, errorApi, seterrorApi } = props;
  const [memeListState, setmemeListState] = useState([]);
  const [baseListState, setbaseListState] = useState([]);
  const [reloadhard, setreloadhard] = useState(false);
  const [reloadsoft, setreloadsoft] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getImages = async () => {
      getFilter("bases")
        .then((res) => {
          seterrorApi(false);
          setbaseListState(res);
          setreloadhard(true);
        })
        .catch((err) => {
          seterrorApi(err);
        });
    };
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ((reloadhard || reloadsoft) && baseListState.length > 0 && check) {
      getFilter(isLogged ? "all" : "public")
        .then((res) => {
          seterrorApi(false);
          const temp = [];
          res.forEach((e) => {
            const bim = baseListState.find((i) => i.id === e.id_base);
            const m = new Memeconstr(
              e.id,
              bim,
              e.title,
              e.id_creator,
              e.creator,
              e.font,
              e.color,
              e.text1,
              e.text2,
              e.text3,
              e.protect
            );
            temp.push(m);
          });
          setmemeListState((old) => {
            const tmp_old = old.filter((e) => e.prov);
            const tmp = temp.reverse();
            if (tmp_old.length > 0) {
              const provs = tmp_old.map((e) => e.id);
              const final = tmp.map((e) => {
                return provs.includes(e.id)
                  ? tmp_old.filter((x) => x.id === e.id)[0]
                  : e;
              });
              if (provs.includes(-1)) {
                return [tmp_old.filter((e) => e.id === -1)[0], ...final];
              }
              return final;
            }
            return tmp;
          });
        })
        .catch((err) => {
          seterrorApi(err);
        })
        .finally(() => {
          setreloadhard(false);
          setreloadsoft(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, reloadhard, reloadsoft, baseListState.length, isLogged]);

  const deleteMeme = function (memeId) {
    setmemeListState((old) =>
      old.map((x) => (x.id === memeId ? { ...x, prov: true } : x))
    );
    deleteById(memeId)
      .then(() => {
        setmemeListState((old) =>
          old.map((x) => (x.id === memeId ? { ...x, prov: false } : x))
        );
      })
      .catch((err) => {
        setmemeListState((old) =>
          old.map((x) => (x.id === memeId ? { ...x, prov: false } : x))
        );
        setErrorShow(true);
        setError(err);
      })
      .finally(() => {
        setreloadsoft(true);
        setDeleting(false);
      });
  };

  const addMeme = function (
    id_base,
    title,
    text1,
    text2,
    text3,
    font,
    color,
    protect
  ) {
    const btmp = baseListState.find((i) => i.id === id_base);

    let meme = {
      id: -1,
      base: btmp,
      title: title,
      text1: text1,
      text2: text2,
      text3: text3,
      font: font,
      color: color,
      protect: protect,
      prov: true,
    };
    setmemeListState((oldlist) => [...oldlist, meme]);
    createNewMeme(id_base, title, font, color, text1, text2, text3, protect)
      .then(() => {
        setmemeListState((old) =>
          old.map((x) => (x.id === -1 ? { ...x, prov: false } : x))
        );
        setreloadsoft(true);
      })
      .catch((err) => {
        setErrorShow(true);
        setError(err);
        setmemeListState((oldlist) => oldlist.filter((x) => x.id !== -1));
      })
      .finally(() => {
        setAdding(false);
      });
  };

  return (
    <>
      {errorShow && !errorApi ? (
        <ErrorMessage setErrShow={setErrorShow} err={error} />
      ) : null}
      <Row className="mx-auto">
        <Col
          className="overflow-auto scrollbar p-0"
          style={{ maxHeight: "100vh" }}
        >
          <div
            className="mx-3 mt-3 mx-sm-4 mt-sm-4"
            style={{ marginBottom: "60px" }}
          >
            {errorApi ? (
              <ErrorAlert errors={errorApi} />
            ) : (
              <MyList
                iduser={iduser}
                setdeleting={setDeleting}
                deleting={deleting}
                username={userName}
                memeListState={memeListState}
                deleteMeme={deleteMeme}
                addMeme={addMeme}
                setprocessing={setAdding}
                adding={adding}
                seterr={setError}
                seterrshow={setErrorShow}
              />
            )}
            {}
            {!errorApi && userName ? (
              <AddButton
                setAddModalShow={setAddModalShow}
                adding={adding}
                seterr={setError}
                seterrshow={setErrorShow}
              />
            ) : null}
            {!errorApi ? <RefreshButton setreload={setreloadhard} /> : null}
          </div>
          {(reloadhard || !check) && !errorApi && <LoadingOverlay />}
        </Col>
      </Row>
      {addModalShow ? (
        <AddModal
          bases={baseListState}
          addModalShow={addModalShow}
          setAddModalShow={setAddModalShow}
          addMeme={addMeme}
          setprocessing={setAdding}
        />
      ) : null}
    </>
  );
}
