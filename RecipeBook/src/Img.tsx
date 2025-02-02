import { Box } from "@mui/material";

const Img = () => {
    return (
        <Box
            component="img"
            src={"/bg.jpg"}
            style={{
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: -1,
                width: '100vw',
                height: '100vh',
                backgroundImage: 'url("/bg.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    );
};

export default Img