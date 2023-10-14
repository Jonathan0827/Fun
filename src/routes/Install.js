import React, { useState } from "react";
import { Btn } from "../components/Button";
import { Link } from "react-router-dom";

function InatallView() {
  const [signed, setSigned] = useState("");
  fetch(`https://cococloud-signing.online/cert-status/api`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.CertificateStatus);
      setSigned(json.CertificateStatus);
    });
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
            <a
              href={
                "https://cococloud-signing.online/free-plist?url=https://reacts.kro.kr/installers/Fun.ipa"
              }
            >
              <Btn title="설치" type="contained" />
            </a>
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
    </div>
  );
}

export default InatallView;
