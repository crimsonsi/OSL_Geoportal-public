import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  GetApp as DownloadIcon,
} from "@mui/icons-material";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import { jwtDecode } from "jwt-decode";

export default function Terms(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("cilbup_ksa");
    if (token) {
      try {
        var decoded = jwtDecode(token);
        setCurrentUser(decoded);

        if (Date.now() >= decoded.exp * 1000) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const termsData = [
    {
      title: "Acceptance of the Terms and Conditions",
      content: [
        "Before You are permitted to Use the Services You are required to accept the Terms and Conditions and any Special Terms (as defined in Clause 20 below), as the case may be. Typically, Terms and Conditions and any Special Terms are accepted by clicking or tabbing the \"accept\" button if such button or function is available or present via the user interface for the respective Service.",
        "You also accept the Terms and Conditions or any Special Terms when You actually start to Use the Services. In this case You understand that You are bound by and Oakar Services will treat You as bound by the Terms and Conditions from the moment You start using the Services."
      ]
    },
    {
      title: "Changes to the Terms and Conditions",
      content: [
        "Oakar Services is permitted to amend or alter the Terms and Conditions from time to time.",
        "Oakar Services will notify You with at least 15 days prior notice (\"Notification Period\") of any material changes of the Terms and Conditions and will provide You with a copy of the revised Terms and Conditions either by the use of Your email address provided to Oakar Services as part of the Registration Data or by any other suitable means which ensure that You will be able to take notice of the revised Terms and Conditions.",
        "After the Notification Period has passed You will be prompted to accept the revised Terms and Conditions, typically by clicking or tabbing the \"accept\" button if such button or function is available or present via the user interface for the respective Service. You may not continue to Use the Services unless You accept the revised Terms and Conditions.",
        "You also accept the revised Terms and Conditions when You continue to Use the Services after the Notification Period has passed. In this case You are bound by and Oakar Services will treat You as bound by the revised Terms and Conditions from the date on which the revised Terms and Conditions entered into effect. You are free to end this Agreement at any time should You choose not to accept the revised Terms and Conditions."
      ]
    },
    {
      title: "Termination of the Terms and Conditions; Consequences of termination",
      content: [
        "This Agreement remains in effect unless and until terminated either by You or Oakar Services, as the case may be.",
        "You can terminate this Agreement at any time by ceasing use of the Services",
        "Oakar Services may terminate this Agreement at any time by providing a 30 days prior written notice of cancellation to the email address provided to Oakar Services as part of Your Registration Data or by any other suitable means which ensure that You will be able to take notice of the cancellation.",
        "Oakar Services is entitled to terminate this Agreement at any time and without observing any notice period if: (a) You are in breach of the Terms and Conditions; (b) You have clearly demonstrated (regardless of whether directly or through Your actions or statements or otherwise) that You do not intend to comply with the Terms and Conditions; (c) Oakar Services, (including Oakar Services's Subsidiaries) or any supplier or partner of Oakar Services providing the Services to or together with Oakar Services decide to terminate the provision of the Services or any parts thereof; and (d) Oakar Services (including Oakar Services's Subsidiaries) or any supplier or partner of Oakar Services providing the Services to or together with Oakar Services are required by applicable law to terminate the provision of the Services or parts thereof.",
        "The termination of this Agreement shall have no prejudice to any rights, obligations and liabilities that You or Oakar Services have accrued or incurred during the term of this Agreement.",
        "You are not permitted to Use the Services if You do not accept the revised Terms and Conditions or after this Agreement comes to an end, for example, due to termination by either You or Kenya Space Agency."
      ]
    },
    {
      title: "Provision of the Services and limitations of usage",
      content: [
        "The Services are provided to You by Oakar Services and Kenya Space Agency's Subsidiaries. By using the Service, you can read, access, launch, and/or download (where available) the content or other tools and applications available in the Application. Content available in the Application may be provided by Oakar Services or third parties. Oakar Services may subcontract all or any part of its activities relating to the Services, to any third party designated by Oakar Services.",
        "Unless otherwise specified in this Agreement You are permitted to Use the Services for personal and non-commercial use and purposes only and You will not reproduce, duplicate, copy, sell, trade or resell any of the Services or parts thereof.",
        "When You Use the Services You will at all times observe these Terms and Conditions and any applicable law or regulation in the relevant jurisdictions including the jurisdiction where You are a resident or from where You are using the Services.",
        "Oakar Services may at any time and in its sole discretion without prior warning or notice: (a) change the Services or suspend and/or cease providing the Services or any part of the Services; (b) disable or suspend Your Use of the Services including access to Your User account(s) and any files or other content contained in Your account(s) either temporarily or permanently; (c) set a limit on the number of transmissions You may send or receive through the Services or on the amount of storage space used for the provision of the Services or any part of the Services to You; and (d) pre-screen, review, flag, filter, modify, refuse, reject, block access to or remove any or all Content from the Services.",
        "Oakar Services will use commercially reasonable efforts to (a) ensure that the Services are available to You without undue disruption, interruption or delay and (b) keep any disruption, interruption or delay of the Services to a minimum.",
        "You are not permitted to Use any of the Services (including any attempts to do so) other than through the interface made available to You by Oakar Services and You will not Use the Services (including any attempts to do so) through any automated tools (including software and/or hardware), functions, services or otherwise (including scripts or web crawlers).",
        "You will comply with and follow all instructions made available to You by Oakar Services in connection with the Services and You will not engage in any activity that may cause interference with or disruption to the Services or any servers, networks or other equipment connected to the Services.",
        "Some of the Services can be used or are particularly useful when used over mobile networks. You should be aware that Your network provider may charge You for access to its network, the duration of Your mobile phone's/ mobile device's connection to the network and the data volume used to Use the Services. You are entirely responsible to check with Your network provider whether any such costs may apply before Using the Services in this respect.",
        "Use of the Services requires a device which is compatible with the Services, and may require a device such as a computer, Internet access (fees may apply), and certain software (fees may apply), including obtaining updates or upgrades from time to time. Because use of the Services involves hardware, software and Internet access, your ability to use the Services may be affected by the performance of these factors. High speed Internet access is strongly recommended. You acknowledge and agree that such system requirements, which may change from time to time, are solely your responsibility.",
        "You consent to receiving electronically all agreements, notices, disclosures and other communications that Oakar Services may provide to You as part of the Services, including via e-mails and push notifications, at the details provided by You or as otherwise as deemed appropriate by Oakar Services."
      ]
    },
    {
      title: "Advertisements",
      content: [
        "You agree that Oakar Services, as part of the Services, places or displays to You advertisements, promotion materials or other content and materials or products for promotional purposes.",
        "In any event, Oakar Services will only send You push notifications, marketing emails or newsletters for marketing purposes where you have explicitly opted to receive such information and communication, for example, when You registered for the Services."
      ]
    },
    {
      title: "Software and software updates",
      content: [
        "Software and software updates to the Services Oakar Services may automatically download and install updates from time to time (including firmware updates for the devices you registered with the Services) (\"Software Updates\"). Such Software Updates may be in various forms and are generally provided for the purposes of improving the performance, security and reliability of the Services or any product or device used to access the Services. Such updates may include bug fixes, enhancements to the Services or parts thereof, products or devices and updates and enhancements to any software previously installed (including entirely new versions). Such Software Updates may take up additional user-accessible internal storage of Your device."
      ]
    },
    {
      title: "Content provided in the Services and content rights",
      content: [
        "All content that is made available in the Services or accessible as part of or by the Use of the Services (including audio and sound files, data files, images, music, photographs, software, videos and written text) (\"Content\") is entirely the responsibility of the originator of such Content. The Content may include advertisements, promotional material and documents or other sponsored Content.",
        "The Content may be protected by proprietary or intellectual property rights of third parties (such as partners, advertisers and sponsors or their agents who provide such Content to Kenya Space Agency). You are not permitted to modify, rent, lease, loan, sell, distribute or create derivative works based on any Content (either in whole or in part) or to grant licenses in the Content.",
        "You understand that by using the Services You are exposed to the risk that You may find some Content offensive, indecent or objectionable and that any Use of the Services as regards such exposure is entirely at Your own risk."
      ]
    },
    {
      title: "User Content and User Content License",
      content: [
        "By uploading, transmitting, creating, posting, displaying or otherwise providing any information, materials, documents, media files or other content on or through the Services (\"User Content\") You permit Oakar Services, Oakar Services's Subsidiaries and other Users of the Services to use the User Content to the extent that this is required for the provision of the Services, and in this respect grant Oakar Services, Oakar Services's Subsidiaries and other Users of the Services an irrevocable, unlimited, worldwide, royalty-free, and non-exclusive license to copy, reproduce, adapt, modify, edit, distribute, translate, digitize, publish, publicly perform and publicly display the User Content (\"User Content License\"), such User Content License in any event to be limited, however, to the purposes of the Services.",
        "The User Content License shall include a right for Kenya Space Agency and Oakar Services's Subsidiaries to (a) perform all technical steps necessary to process and prepare the User Content for use in the Services, including any modification and/or adaption required to provide the Services to Users and/or to transmit or distribute the User Content over public networks and in media and (b) make available and sublicense the User Content to third parties for the use of the User Content in connection with the provision of the respective services by these third parties.",
        "Oakar Services does not claim ownership of the User Content and You will retain any copyright and any other rights to any User Content provided by You on or through the Services.",
        "Any protection and enforcement of any intellectual property rights which exist or pertain to the User Content are entirely Your responsibility and Oakar Services is not obliged to protect and enforce the User Content on Your behalf.",
        "You are entirely responsible to backup Your User Content stored with Oakar Services or through the Services to another location outside the Services (e.g. by means of creating local copies or backups with specialized online backup services) to avoid loss of Your User Content and other data."
      ]
    },
    {
      title: "Oakar Services Services License",
      content: [
        "Oakar Services, Oakar Services's Subsidiaries and/or any supplier or licensor of Oakar Services are the owners and shall be entitled to all proprietary rights which may exist in the Services, including all legal right, title and interest in and to the Services, and all intellectual property rights worldwide, regardless of whether registered/legally secured or not.",
        "Oakar Services grants You a worldwide, non-transferrable, non-assignable, non-exclusive, personal and royalty free license to Use the Services (including any software, products or materials provided to You as part of the Services) and in the form provided to You by Oakar Services (\"Oakar Services License\"). The Kenya Space Agency License entitles You to enjoy the benefits of the Services in accordance with these Terms and Conditions.",
        "Except for the rights granted to You in this Agreement, Kenya Space Agency retains all rights in or pertaining to the Services.",
        "You are not permitted to (a) grant any other User or third party a license to Use the Services or otherwise to access Your account or the Services, (b) Use the Services to provide services to other Users or any other third parties or (c) otherwise assign, grant a sublicense in, or grant a security interest in or over the Oakar Services License or any rights under it, loan or lease the Services and/or the Oakar Services Oakar Services License, or otherwise transfer the Oakar Services License or any rights under it to any third party.",
        "You are not permitted to copy, edit, modify, alter or create a derivative work of, reverse engineer, decompile or otherwise attempt to extract the source code of Oakar Services Services (or any part of it), unless expressly permitted by Oakar Services in writing, or to the extent permitted under the laws applicable to You, and You will not permit or grant a license to any third party to do so."
      ]
    },
    {
      title: "Trademarks",
      content: [
        "You are not entitled to use any of Oakar Services's (including Oakar Services's Subsidiaries) trade names, trademarks, service marks, logos, domain names, or other distinctive brand features (\"Oakar Services's Brands\") without Oakar Services's prior written consent. To the extent that You are entitled to use Oakar Services's Brands under a separate written agreement with Oakar Services, such use is only permitted in accordance with such separate agreement.",
        "You are not permitted to remove, obscure, conceal, modify or otherwise alter any proprietary rights notices, signs, trademarks, service marks, trade names, logos or other marks of Kenya Space Agency, Oakar Services's Subsidiaries or any third party (including copyright and trade mark notices) which pertain to, are affixed to or which are contained within the Services and You agree not to use any such signs, trademarks, service marks, trade names, logos or other marks of Oakar Services, Oakar Services's Subsidiaries or any third party in a way that is intended to, likely to or foreseeable to mislead others or cause confusion about the owner, license holder or authorized User, as the case may be, of such marks, names or logos."
      ]
    },
    {
      title: "Registration data and Users account",
      content: [
        "When You Use the Services You may be required to provide information about Yourself before You can continue to Use the Services (\"Registration Data\").",
        "You agree to provide accurate, current and complete Registration Data and to update Your Registration Data as required in order to keep it accurate, current and complete."
      ]
    },
    {
      title: "Passwords and account security",
      content: [
        "In order to Use the Services You are required to open a User account and to provide a User ID and password (\"Account Data\"), and register using either an e-mail address of your choice or Your existing Facebook, Google Plus, or Oakar Services Account.",
        "The Services offer You an integrated registration solution through a single sign on process (\"SingleSignOn\"). SingleSignOn means that once You open the User account with Oakar Services, You would be able to automatically access all Services without the need to register and sign-on separately for each individual Service. SingleSignOn also allows You to sign in and log out from all Services and through all of Your devices at the same time.",
        "You will keep your Account Data safe and secure at all times and prevent unauthorised access to Your Account Data and Your account by third parties, in particular by avoiding obvious User IDs or passwords, by changing Your password regularly and by ensuring that You do not disclose your password(s) or grant any other User or third party access to Your Account Data or Your account.",
        "Oakar Services may follow any instructions given by You and may regard any instructions (a) received from or issued by a User or third party using or providing your Account Data or (b) which are attributable to You or Your Account Data as Your instructions.",
        "You agree not to use any Account Data or account of any other User or person than Yourself without permission of the User or person holding the respective account.",
        "You will notify Oakar Services immediately by email to support@myKenya Space Agency.asia upon becoming aware of any unauthorized use of any of Your Registration Data or Account Data or any other breach of security.",
        "PLEASE NOTE THAT You will not be able to change Your Registration Data or Account Data after registration. If you have any queries, please contact Oakar Services at support@myKenya Space Agency.asia."
      ]
    },
    {
      title: "Privacy and protection of personal data",
      content: [
        "Oakar Services is committed to the protection of Your personal data. See our Privacy Policy (http://account.Kenya Space Agency.com/membership/pp) to learn more about how Oakar Services protects and handles Your personal data and information when You Use the Services. You agree to the Use of Your Registration Data, and all other personal data and information in accordance with Kenya Space Agency's privacy policy. Please note in particular that Kenya Space Agency and Oakar Services's partners use various technologies to collect and store information when you access any particular service or Service or when you interact with any service or services offered to or by Oakar Services's partners. You agree that Kenya Space Agency and Oakar Services's partners may collect, store and use this data and information to provide recommendations and personalization of the Services offered to You, which may include sending of electronic and other communications in accordance with Clause 4.10 above."
      ]
    },
    {
      title: "YOUR WARRANTIES AND REPRESENTATIONS",
      content: [
        "YOU ARE ENTIRELY RESPONSIBLE FOR THE USER CONTENT PROVIDED BY YOU AND FOR ANY CONSEQUENCES ARISING IN CONNECTION WITH THAT USER CONTENT (INCLUDING ANY LOSS OR DAMAGE SUFFERED OR INCURRED BY Kenya Space Agency AND Oakar Services'S SUBSIDIARIES). IN PARTICULAR, YOU WARRANT AND REPRESENT TO Oakar Services THAT:",
        "A. YOU ARE THE OWNER OF ALL RIGHTS PERTAINING TO THE USER CONTENT OR OTHERWISE AUTHORIZED TO GRANT Oakar Services THE USER CONTENT LICENSE;",
        "B. THE USER CONTENT WILL NOT INFRINGE ANY INTELLECTUAL PROPERTY OR OTHER THIRD PARTY RIGHTS;",
        "C. THE USER CONTENT WILL NOT CONTAIN ANY MATERIAL WHICH IS HARMFUL, INACCURATE, PORNOGRAPHIC, ABUSIVE, OBSCENE, THREATENING, DEFAMATORY, OR WHICH IS OTHERWISE ILLEGAL OR WHICH DOES NOT COMPLY WITH APPLICABLE LAW OR Oakar Services'S CONTENT GUIDELINES;",
        "D. THE USER CONTENT WILL NOT CONTAIN ANY VIRUSES OR OTHER HARMFUL SOFTWARE, CODE OR SIMILAR MEANS AND DEVICES WHICH COULD DAMAGE, HARM, DISABLE OR OTHERWISE IMPACT OR LIMIT THE FUNCTION AND PERFORMANCE OF THE SERVICES AND/OR ANY DEVICE ACCESSING SUCH USER CONTENT. REGARDLESS OF WHETHER THIS DEVICE BELONGS TO Oakar Services OR ANY OTHER USER OR THIRD PARTY INCLUDING SERVER, NETWORKS NODES OR ANY SIMILAR EQUIPMENT;",
        "E. THE USER CONTENT WILL COMPLY AND CONFORM TO ANY AGE CLASSIFICATION RULES AND REQUIREMENTS (INCLUDING ACCURATE AND ADEQUATE CLASSIFICATION AND RATING OF ANY USER CONTENT, AS THE CASE MAY BE) UNDER THE LAWS OF ANY COUNTRY, INCLUDING THE COUNTRY IN WHICH YOU ARE A RESIDENT OR FROM WHICH YOU ARE USING THE SERVICES; AND",
        "F. THE USE OF THE USER CONTENT BY Oakar Services OR Kenya Space Agency'S SUBSIDIARIES WILL NOT IMPOSE ANY OBLIGATION UPON Kenya Space Agency OR Oakar Services'S SUBSIDIARIES TO PAY ANY KIND OF MONETARY CONTRIBUTION (INCLUDING LICENSE FEES, DUES OR OTHERWISE) TO ANY THIRD PARTY (IN PARTICULAR COLLECTING SOCIETIES).",
        "YOU AGREE TO INDEMNIFY AND HOLD HARMLESS Oakar Services AND THE Oakar Services SUBSIDIARIES FROM ANY LOSS, DAMAGE, LIABILITY OR EXPENSE INCURRED BY Oakar Services AND THE Oakar Services SUBSIDIARIES AS A RESULT OF ANY BREACH OF THESE WARRANTIES."
      ]
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="Terms and Conditions"
      />

      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            Terms and Conditions
          </Typography>
          
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
            Oakar Services Terms and Conditions
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              href="#"
              sx={{ mb: 2 }}
            >
              Download PDF Version
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              The terms and conditions ("Terms and Conditions") in this document ("Agreement") describe and stipulate the provisions which govern and regulate the legal relationship between Oakar Services Electronics Co. Ltd. ("Oakar Services") and/or Oakar Services's Subsidiaries as provider of the Services and you as user of the Services ("You" or "User").
            </Typography>
          </Alert>

          <Typography variant="body1" paragraph>
            You should read these Terms and Conditions carefully and should not accept these Terms and Conditions or register for, access or use the Services (collectively as "Use" of the Services) unless You agree to the Terms and Conditions. Oakar Services does not store an individual copy of this Agreement entered into with You and we recommend that You save a local copy of this Agreement for Your own record.
          </Typography>

          <Typography variant="body1" paragraph>
            You may not Use the Services if You are a (a) person who is not of legal age to form a binding contract with Oakar Services or (b) person who is barred from receiving the Services under the laws of any country including the country in which You are a resident or from which You are using the Services.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Definitions
            </Typography>
            <Typography variant="body1" paragraph>
              In this Agreement:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>"Service" or "Services"</strong> means myKenya Space Agency Application and any applications, websites, WAP, software, services, Single Sign On module, and any marketing programs run under the name of myKenya Space Agency, and other related services provided by any third party designated by us; and
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>"Oakar Services's Subsidiaries"</strong> means all legal entities, companies, corporations, firms, partnerships or other entities that are controlled by Oakar Services or are under common control with Oakar Services. The term "controlled" means the ability to direct the management of the relevant entity.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Terms and Conditions Sections
          </Typography>

          {termsData.map((section, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  {index + 1}. {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section.content.map((paragraph, pIndex) => (
                  <Typography key={pIndex} variant="body1" paragraph>
                    {paragraph}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}

          <Alert severity="warning" sx={{ mt: 4 }}>
            <Typography variant="body2">
              <strong>Important:</strong> By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </Typography>
          </Alert>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
