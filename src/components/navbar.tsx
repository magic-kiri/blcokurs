import navStyle from "./footer.module.css";
import { Col, Row } from 'antd';
import navlogo from '../../public/logonav.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className={navStyle.navbar}>
        <Row >
            <Col span={8}></Col>
            <Col span={8}>
                <div className={navStyle.logo}>
                    <Image
                        src={navlogo}
                        alt="BlockURS Logo"
                        height="33"
                        width="144"
                    />
                </div>
            </Col>
            <Col span={8}></Col>
        </Row>
    </div>
  );
};
export default Navbar;