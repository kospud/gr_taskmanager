import { Link } from "react-router-dom"
import { MenuItemProps } from "../../types"
import { SvgIcon } from "@mui/material";

const MenuItem = (props: MenuItemProps) => {

    const linkStyle = {
        textDecoration: "none",
        color: 'black'
    };
    
    return (
        <li className="menuLiItem">
            <Link to={props.path} style={linkStyle}>
                <div className="menuItem">
                    <SvgIcon className="menuItemIcon">{props.icon}</SvgIcon>
                    <a className="menuItemText">{props.text}</a>
                </div>
            </Link>
        </li>
    )
}

export default MenuItem;