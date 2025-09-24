import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  GitHub,
  Public,
  Security,
  Description,
  Help,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(6, 0, 2),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.secondary.light,
  fontSize: '1.1rem',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255,255,255,0.8)',
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1),
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.secondary.light,
    textDecoration: 'underline',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255,255,255,0.8)',
  margin: theme.spacing(0.5),
  '&:hover': {
    color: theme.palette.secondary.light,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const quickLinks = [
    { label: 'Browse Data', href: '/data' },
    { label: 'Knowledge Hub', href: '/publications' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'API Documentation', href: '/api-docs' },
  ];

  const dataCategories = [
    { label: 'Agriculture', href: '/categories/Agriculture' },
    { label: 'Climate & Weather', href: '/categories/Climate and Weather' },
    { label: 'Natural Resources', href: '/categories/Natural Resources' },
    { label: 'Spatial Planning', href: '/categories/Spatial Planning' },
    { label: 'Disaster Management', href: '/categories/Disaster' },
    { label: 'General Data', href: '/categories/General Data' },
  ];

  const legalLinks = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacypolicy' },
    { label: 'Data License', href: '/license' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  const supportLinks = [
    { label: 'User Guide', href: '/guide' },
    { label: 'API Documentation', href: '/api-docs' },
    { label: 'Data Standards', href: '/standards' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Report Issues', href: '/issues' },
  ];

  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FooterSection>
              <FooterTitle variant="h6">
                Oakar Services GeoPortal
              </FooterTitle>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Your comprehensive gateway to open data and spatial intelligence. 
                Empowering researchers, developers, and citizens with accessible, 
                reliable geospatial data and tools.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Saudi Arabia
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@oakar-services.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +966 XX XXX XXXX
                </Typography>
              </Box>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FooterSection>
              <FooterTitle variant="h6">Quick Links</FooterTitle>
              {quickLinks.map((link, index) => (
                <FooterLink
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.href;
                  }}
                >
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* Data Categories */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FooterSection>
              <FooterTitle variant="h6">Data Categories</FooterTitle>
              {dataCategories.map((category, index) => (
                <FooterLink
                  key={index}
                  href={category.href}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = category.href;
                  }}
                >
                  {category.label}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FooterSection>
              <FooterTitle variant="h6">Support</FooterTitle>
              {supportLinks.map((link, index) => (
                <FooterLink
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.href;
                  }}
                >
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* Legal */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FooterSection>
              <FooterTitle variant="h6">Legal</FooterTitle>
              {legalLinks.map((link, index) => (
                <FooterLink
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.href;
                  }}
                >
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>
        </Grid>

        {/* Social Media and Additional Info */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Public sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Open Data Initiative
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Secure & Reliable Platform
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Description sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Comprehensive Documentation
              </Typography>
            </Box>
          </Grid>
          
            <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Follow us on social media
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <SocialIconButton
                  onClick={() => window.open('https://facebook.com/oakarservices', '_blank')}
                >
                  <Facebook />
                </SocialIconButton>
                <SocialIconButton
                  onClick={() => window.open('https://twitter.com/oakarservices', '_blank')}
                >
                  <Twitter />
                </SocialIconButton>
                <SocialIconButton
                  onClick={() => window.open('https://linkedin.com/company/oakarservices', '_blank')}
                >
                  <LinkedIn />
                </SocialIconButton>
                <SocialIconButton
                  onClick={() => window.open('https://github.com/oakarservices', '_blank')}
                >
                  <GitHub />
                </SocialIconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Oakar Services. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
            This platform is committed to providing open, accessible, and reliable geospatial data.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;