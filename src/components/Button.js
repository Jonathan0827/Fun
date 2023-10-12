import styles from "./Button.module.css";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function Btn({ title, type, onclick }) {
  return (
    // <button className={styles.default} onClick={onclick}>
    //   {title}
    // </button>
    <Button variant={type} onClick={onclick} className={styles.default}>
      {title}
    </Button>
  );
}

function DBtn({ title, type }) {
  return (
    // <button className={styles.default} onClick={onclick}>
    //   {title}
    // </button>
    <Button variant={type} disabled>
      {title}
    </Button>
  );
}

PropTypes.Btn = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onclick: PropTypes.func,
};
PropTypes.dBtn = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export { Btn, DBtn };
