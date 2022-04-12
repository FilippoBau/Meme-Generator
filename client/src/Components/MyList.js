//@ts-check
import { Table, Alert } from "react-bootstrap";
import MyListItem from "./MyListItem";
import React from "react";

const MyList = function Mylist(props) {
  let pubblici = props.memeListState.filter((x) => !x.protect).reverse();
  let privati = props.memeListState.filter((x) => x.protect).reverse();

  return (
    <>
      <h2> Public: </h2>
      <Table responsive>
        <tbody className="d-flex">
          <tr>
            {pubblici.length !== 0 ? (
              pubblici.map((x, index) => (
                <td key={index}>
                  <MyListItem
                    iduser={props.iduser}
                    username={props.username}
                    item={x}
                    id={x.id}
                    deleteMeme={props.deleteMeme}
                    setdeleting={props.setdeleting}
                    deleting={props.deleting}
                    addMeme={props.addMeme}
                    setprocessing={props.setprocessing}
                    adding={props.adding}
                    seterr={props.seterr}
                    seterrshow={props.seterrshow}
                  ></MyListItem>
                </td>
              ))
            ) : (
              <td>
                <Alert variant="warning">
                  Seems like there isn't any publicmemes 😱😭{" "}
                </Alert>
              </td>
            )}
          </tr>
          {/**Line at the end*/}
          <tr>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </Table>

      {props.username ? (
        <>
          <h2> Protected: </h2>
          <Table responsive>
            <tbody className="d-flex">
              <tr>
                {privati.length !== 0 ? (
                  privati.map((x, index) => (
                    <td key={index}>
                      <MyListItem
                        iduser={props.iduser}
                        username={props.username}
                        item={x}
                        id={x.id}
                        deleteMeme={props.deleteMeme}
                        setdeleting={props.setdeleting}
                        deleting={props.deleting}
                        addMeme={props.addMeme}
                        setprocessing={props.setprocessing}
                        adding={props.adding}
                        seterr={props.seterr}
                        seterrshow={props.seterrshow}
                      ></MyListItem>
                    </td>
                  ))
                ) : (
                  <td>
                    {" "}
                    <Alert variant="warning">
                      Seems like there isn't any protected memes 😱😭{" "}
                    </Alert>
                  </td>
                )}
              </tr>
              {/**Line at the end*/}
              <tr>
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </Table>
        </>
      ) : null}
    </>
  );
};

export default MyList;
