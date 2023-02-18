import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBase } from "@mui/material";
import config from "config";
import Logo from "ui-component/Logo";

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization?.defaultId);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch.customization.setActiveId({ id: defaultId });
  };

  return (
    <ButtonBase
      disableRipple
      onClick={handleClick}
      component={Link}
      to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
