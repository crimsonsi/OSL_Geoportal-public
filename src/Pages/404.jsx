import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";

function NotFound() {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<Box>
			<Header />
			<Container>
				<Box
					sx={{
						minHeight: "60vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						textAlign: "center",
						py: 4
					}}
				>
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: "4rem", md: "6rem" },
							fontWeight: "bold",
							color: "primary.main",
							mb: 2
						}}
						data-aos="fade-up"
						data-aos-offset={300}
						data-aos-duration={900}
						data-aos-delay={200}
					>
						404
					</Typography>
					<Typography
						variant="h4"
						sx={{
							color: "text.secondary",
							mb: 2
						}}
						data-aos="fade-up"
						data-aos-offset={300}
						data-aos-duration={900}
						data-aos-delay={400}
					>
						Page Not Found
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: "text.secondary",
							maxWidth: "600px",
							mb: 4,
							lineHeight: 1.6
						}}
						data-aos="fade-up"
						data-aos-offset={300}
						data-aos-duration={900}
						data-aos-delay={600}
					>
						Sorry, the page you are looking for doesn't exist or has been moved. 
						Please check the URL or navigate back to the homepage.
					</Typography>
					<Button
						variant="contained"
						size="large"
						onClick={handleGoHome}
						data-aos="fade-up"
						data-aos-offset={300}
						data-aos-duration={900}
						data-aos-delay={800}
					>
						Go to Homepage
					</Button>
				</Box>
			</Container>
			<Footer />
		</Box>
	);
}

export default NotFound;
