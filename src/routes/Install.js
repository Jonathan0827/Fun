import React, { useState, useEffect } from "react";
import { Btn } from "../components/Button";
import { Link } from "react-router-dom";
import { Modal, Alert, Box, List, ListItem, ListItemText } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};
const IOSURL =
  '"https://cococloud-signing.online/free-plist?url=https://reacts.kro.kr/installers/Fun.ipa"';

function InatallView() {
  const [signed, setSigned] = useState("");
  const [certName, setCertName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    fetch(`https://cococloud-signing.online/cert-status/api`)
      .then((res) => res.json())
      .then((json) => {
        setSigned(json.CertificateStatus);
        setCertName(json.CertificateName);
      });
  }, []);
  return (
    <div>
      <h1>앱 설치</h1>
      <h2>iOS</h2>
      <h3>
        상태:
        {signed == ""
          ? "로딩중"
          : signed
          ? "설치 가능"
          : "설치 불가능(며칠 뒤에 다시 시도능해주세요.)"}
        {signed ? (
          <span>
            <br />
            {/*<a*/}
            {/*  href={*/}
            {/*    IOSURL*/}
            {/*  }*/}
            {/*>*/}
            <Btn
              title="설치"
              type="contained"
              onclick={() => setOpenModal(true)}
            />
            {/*</a>*/}
            <a href={"https://reacts.kro.kr/installers/Fun.ipa"}>
              <Btn title="iPA 다운로드" type="outlined" />
            </a>
          </span>
        ) : null}
      </h3>
      <h2>Android</h2>
      <h3>
        <a href={"https://https://reacts.kro.kr/installers/Fun.apk"}>
          <Btn title="APK 다운로드" type="contained" />
        </a>
      </h3>
      <h1>
        <Link to={"/"}>
          <Btn title="돌아가기" type="contained" />
        </Link>
      </h1>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        {/*<h1></h1>*/}
        <Box sx={style}>
          <Alert severity="info">
            <strong>앱 설치 방법</strong>
          </Alert>
          <List>
            <ListItem>
              1.{" "}
              <a href={IOSURL}>설치 버튼</a>을 누릅니다.
            </ListItem>
            <ListItem>2. '설치'를 누르면 설치가 시작됩니다.</ListItem>
            <ListItem>
              3. 설정에서 일반 > VPN 및 기기 관리를 순서대로 선택합니다.
            </ListItem>
            <ListItem>
              4. '{certName}'를 누르고 '{certName}을(를) 신뢰함'를 누릅니다.
            </ListItem>
          </List>
          <Alert severity="warning">
            <strong>앱이 실행되지 않을 경우</strong>
          </Alert>
          <List>
            <ListItemText
              primary="'Fun'을(를) 더 이상 사용할 수 없음"
              secondary="앱이 만료되었습니다. 앱을 지운 후 재설치하세요."
            />
          </List>
        </Box>
      </Modal>
    </div>
  );
}

export default InatallView;
