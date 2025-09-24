import "../Styles/PrivacyPolicy.scss";
import React from "react";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/Footer";
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Link, 
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

export default function PrivacyPolicy(props) {
  return (
    <div className="AboutPrivacy">
      <div className="headings">
        <Header
          isAuthenticated={props.isAuthenticated}
          setIsAuthenticated={props.setIsAuthenticated}
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
        />
      </div>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            Privacy Policy
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              Oakar Services Privacy Policy
            </Typography>
            <Link href="#" variant="body1" sx={{ display: 'block', mb: 2 }}>
              Download PDF Version
            </Link>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              1.0 Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              Your privacy is important to us. This privacy statement explains the
              personal data Oakar Services Plc ("Oakar Services") collects, how
              Oakar Services processes it, and for what purposes.
            </Typography>
            <Typography variant="body1" paragraph>
              This statement should be read together with the Terms and Conditions
              of Use for other Oakar Services products and services. Where there is
              a conflict, this statement will prevail.
            </Typography>
            <Typography variant="body1" paragraph>
              This statement applies to all customers, suppliers, agents, merchants,
              dealers and all visitors frequenting any of Oakar Services premises.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              2.0 Definitions
            </Typography>
            <Typography variant="body1" paragraph>
              References to
            </Typography>
            
            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              2.1 "You" means:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="i) Customer" 
                  secondary="the person who subscribes to, uses or purchases any of our products and services or accesses our websites and includes any person who accesses any of the products and services you have subscribed to."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="ii) Agent/Dealer/Merchant" 
                  secondary="Any agent, dealer and/or merchants who has signed an agreement with us and is recognised as a merchant or agent in accordance with any applicable laws or Regulations."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="iii) Visitor" 
                  secondary="Any visitor that is a person (including contractors/subcontractors or any third parties) who gains access to any Oakar Services premises."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="iv) Supplier" 
                  secondary="Any supplier who has been contracted by Oakar Services and executed a supplier contract."
                />
              </ListItem>
            </List>

            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              2.2 "Oakar Services"
            </Typography>
            <Typography variant="body1" paragraph>
              "Oakar Services", "we" or "us", "our" and "ours" means Kenya Space
              Agency Plc. The word "includes" means that what follows is not
              necessarily exhaustive and therefore the examples given are not the
              only things/situations included in the meaning or explanation of that
              text.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              3.0 Statement Details
            </Typography>
            
            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              3.1 Collection of Information
            </Typography>
            <Typography variant="body1" paragraph>
              3.1.1 We collect your personal information with your knowledge and
              consent when you do any of the following (please note that this list
              is not exhaustive):
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText primary="a) Register for a specific product or service, including but not limited to SIM-card registration, PostPay subscriptions, e-commerce platforms, M-PESA and M-PESA-powered services;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="b) Buy, subscribe to or use a Oakar Services product or service online, on the cloud, on a mobile or other device, in a Kenya Space Agency Shop or other retail outlet;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="c) Subscribe to Oakar Services or third-party premium rates services, Short Message Service (SMS), email or social media platforms;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="d) Ask Oakar Services for more information about a product or service or contact Oakar Services with a query or complaint;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="e) Respond to or participate in a survey, marketing promotion, prize competition or special offer;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="f) Visit, access or use Oakar Services or third-party websites;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="g) We may also collect your information from other organisations including credit-reference bureaus, fraud prevention agencies and business directories;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="h) We may collect your information when you interact with us as a supplier, agent, merchant or dealer as prescribed in this statement;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="i) We also collect information when you visit any of our premises." />
              </ListItem>
            </List>

            <Typography variant="body1" paragraph>
              3.1.2 We do not onboard minors (any person under 18 years of age)
              except where you additionally register on their behalf as their parent
              and/ or legal guardian. If you allow a child to use our services, you
              should be aware that their personal information could be collected as
              described in this statement.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              3.2 What Information is collected?
            </Typography>
            <Typography variant="body1" paragraph>
              The information we collect and store about you includes but is not
              limited to the following:
            </Typography>

            <List>
              <ListItem>
                <ListItemText 
                  primary="3.2.1 Identity and SIM-card registration information" 
                  secondary="including your name, photograph, address, location, phone number, identity document type and number, date of birth, email address, age, gender and mobile number portability records."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.2 Financial information" 
                  secondary="Your credit or debit-card information, information about your bank account numbers and SWIFT codes or other banking information."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.3 Transaction information" 
                  secondary="Your transaction information when you use our MPESA service."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.4 Preferences" 
                  secondary="Your preferences for particular products and services, based on information provided by you or from your use of Oakar Services's (or third party) network, products and services."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.5 Survey data" 
                  secondary="Name, family details, age, profiling information such as level of education, bank account status, income brackets, etc. collected as part of surveys conducted by Oakar Services and their agents on behalf of Oakar Services."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.6 Contact interactions" 
                  secondary="Your contact with us, such as when you: call us or interact with us through social media, our chatbot Zuri, 'snail mail', email (we may record your conversations, social media or other interactions with us), register your biometric information such as your voice, finger prints etc, visit a Oakar Services Shop or other retail outlet."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.7 Account information" 
                  secondary="such as your handset type/model, tariff, top-ups; subscriptions (including third party subscriptions), billing statements, cloud hosting registration details, e-commerce registration and usage, M-PESA and mobile money transactions."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.8 Call data records" 
                  secondary="phone numbers that you call or send messages to (or receive calls and messages from), log of calls, messages or data sessions on the Oakar Services network and your approximate location (save for customer service interactions as noted above we do not record or store message or call contents)."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.9 CCTV surveillance" 
                  secondary="We use Closed Circuit Television (CCTV) surveillance recordings. CCTV Devices are installed at strategic locations to provide a safe and secure environment in all Oakar Services premises as a part of our commitment to community safety, security and crime prevention."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.10 Parking information" 
                  secondary="When you request us to reserve parking for you, we will collect and retain your personal data (name, telephone number, and vehicle registration details) when you request Oakar Services to reserve parking space for you and where you use any of our parking facilities as a contractor."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.11 Visitor register" 
                  secondary="We maintain a register of visitors in which we collect and keep your personal data such as names, company/institution details, telephone number, vehicle registration details and National ID number. This information is collected for health, safety and security purposes."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.12 WiFi usage" 
                  secondary="When you use Oakar Services WIFI for guest and visitors, we collect email IDs and will provide user name and password. We record the device address and also log traffic information in the form of sites visited, duration and date sent/received."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.13 Medical information" 
                  secondary="We may use your medical information to manage our services and products to you e.g. when you use our services designed for persons with disabilities such as our braille watch for the visually impaired."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.14 Voice biometrics" 
                  secondary="Where you use our voice recognition platform (IVR) we may collect and process your voice biometrics."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.15 Incident reporting" 
                  secondary="We collect your personal information when you visit us for purposes of accident and incident reporting. Oakar Services will collect personal data from the injured party or person suffering from ill health, such as, Name, Address, Age, next of kin, details of the incident to include any relevant medical history."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3.2.16 Investigation data" 
                  secondary="Incidents and accidents will be investigated to establish what lessons can be learned to prevent such incidents/accidents reoccurring including introduction of additional safeguards, procedures, information instruction and training, or any combination of these."
                />
              </ListItem>
            </List>

            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              3.3 Use of Information
            </Typography>
            <Typography variant="body1" paragraph>
              We may use and analyse your information for the following purposes:
            </Typography>

            <List>
              <ListItem>
                <ListItemText primary="3.3.1 Processing products and services that you have bought from Kenya Space Agency or from third parties on our ecommerce platforms;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.2 Billing you for using our or third-party products or services or taking the appropriate amount of credit from you;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.3 Responding to any of your queries or concerns;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.4 Verifying your identity information through publicly available and/or restricted government databases in order to comply with applicable regulatory requirements;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.5 Carrying out credit checks and credit scoring;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.6 Keeping you informed generally about new products and services and contacting you with offers or promotions based on how you use our or third-party products and services unless you opt out of receiving such marketing messages;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.7 to comply with any legal, governmental or regulatory requirement or for use by our lawyers in connection with any legal proceedings;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.8 In business practices including to quality control, training and ensuring effective systems operations;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.9 To protect our network including to manage the volume of calls, texts and other use of our network;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.10 To understand how you use our network, products and services for purposes of developing or improving products and services;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.11 Preventing and detecting fraud or other crimes and for debt recovery;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.12 For research, statistical, survey and other scientific or business purposes;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.13 Provide aggregated data (which do not contain any information which may identify you as an individual) to third parties for research and scientific purpose;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3.3.14 Administer any of our online platforms/websites." />
              </ListItem>
            </List>

            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              3.4. Categories of Data
            </Typography>
            <Typography variant="body1" paragraph>
              Categories of Personal Data as defined in the Data Protection Act of
              Kenya may be processed depending on the particular types of products
              and services you have subscribed to.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              3.5. Lawful Basis for processing your information
            </Typography>
            <Typography variant="body1" paragraph>
              We will process your personal information based on any of the lawful
              basis provided for under the Data Protection Law:
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              3.6. Retention of Information
            </Typography>
            <Typography variant="body1" paragraph>
              We will only retain your personal data for as long as reasonably
              necessary to fulfil the purposes we collected it for, including for
              the purposes of satisfying any legal, regulatory, tax, accounting or
              reporting requirements. We may retain your personal data for a longer
              period in the event of a complaint or if we reasonably believe there
              is a prospect of litigation in respect to our relationship with you.
              To determine the appropriate retention period for personal data, we
              consider the amount, nature and sensitivity of the personal data, the
              potential risk of harm from unauthorised use or disclosure of your
              personal data, the purposes for which we process your personal data
              and whether we can achieve those purposes through other means, the
              need to comply with our internal policy and the applicable legal,
              regulatory, tax, accounting or other requirements. Anonymised
              information that can no longer be associated with you may be held
              indefinitely.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              4.0 Disclosure of Information
            </Typography>
            <Typography variant="body1" paragraph>
              4.1 Any disclosure of your information shall be in accordance with
              applicable law and regulations. Oakar Services shall assess and review each application for
              information and may decline to grant such information to the
              requesting party.
            </Typography>
            
            <Typography variant="body1" paragraph>
              4.2 We may disclose your information to:
            </Typography>

            <List>
              <ListItem>
                <ListItemText primary="a) Law-enforcement agencies, regulatory authorities, courts or other statutory authorities in response to a demand issued with the appropriate lawful mandate and where the form and scope of the demand is compliant with the law." />
              </ListItem>
              <ListItem>
                <ListItemText primary="b) Our subsidiaries, associates, partners, software developers or agents who are involved in delivering Oakar Services products and services you order or use;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="c) Fraud prevention and Anti money laundering agencies, credit-reference agencies;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="d) Publicly available and/or restricted government databases to verify your identity information in order to comply with regulatory requirements;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="e) Debt-collection agencies or other debt-recovery organisations;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="f) Survey agencies that conduct surveys on behalf of Kenya Space Agency;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="g) Emergency service providers when you make an emergency call (or where such disclosure to emergency service providers is necessary for your rescue, health and safety) including your approximate location;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="h) Any other person that we deem legitimately necessary to share the data with." />
              </ListItem>
            </List>

            <Typography variant="body1" paragraph>
              4.3 Some of your information may be passed on to any person whom you
              receive mobile money from or send or intend to send mobile money to.
              Your information may be available to any third party involved
              in the operation of the mobile money service including Lipa Na M-PESA
              Merchants, mobile money interoperability partners, ATM Switch
              providers and vendors of the M-PESA money transfer technology
              platform.
            </Typography>

            <Typography variant="body1" paragraph>
              4.4 We shall not release any information to any individual or entity
              that is acting beyond its legal mandate.
            </Typography>

            <Typography variant="body1" paragraph>
              4.5 We will get your express consent before we share your personal
              data with any third party for direct marketing purposes.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              4.6 Direct Marketing
            </Typography>
            <Typography variant="body1" paragraph>
              4.6.1 You may be required to opt in or give any other form of explicit
              consent before receiving marketing messages from us.
            </Typography>
            <Typography variant="body1" paragraph>
              4.6.2 You can ask us to stop sending you marketing messages at any
              time by writing to us or logging into our website, www.Kenya Space
              Agency.co.ke and checking or unchecking relevant boxes to adjust your
              marketing preferences or by following the optout links on any
              marketing message sent to you or by attending to us or contacting us
              at any time through the provided contacts.
            </Typography>
            <Typography variant="body1" paragraph>
              4.6.3 Where you opt out of receiving these marketing messages, this
              will not apply to personal data provided to us as a result of a
              product, service already taken up, warranty registration, product or
              service experience or other transactions.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              5.0 The Use of Cookies
            </Typography>
            <Typography variant="body1" paragraph>
              5.1 We may store some information (using "cookies") on your computer
              when you visit our websites. This enables us to recognise you during subsequent visits. The
              type of information gathered is non-personal (such as: the Internet
              Protocol (IP) address of your computer, the date and time of your
              visit, which pages you browsed and whether the pages have been
              delivered successfully.
            </Typography>
            <Typography variant="body1" paragraph>
              5.2 We may also use this data in aggregate form to develop customised
              services - tailored to your individual interests and needs. Should you
              choose to do so, it is possible (depending on the browser you are
              using), to be prompted before accepting any cookies, or to prevent
              your browser from accepting any cookies at all. This will however
              cause certain features of the web site not to be accessible.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              6.0 The Use of Hyperlinks
            </Typography>
            <Typography variant="body1" paragraph>
              6.1 Our websites may provide hyperlinks to other locations or websites
              on the Internet. These hyperlinks lead to websites published or
              operated by third parties who are not affiliated with or in any way
              related to us and have been included in our website to enhance your
              user experience and are presented for information purposes only.
            </Typography>
            <Typography variant="body1" paragraph>
              6.2 We do not endorse, recommend, approve or guarantee any third-
              party products and services by providing hyperlinks to an external
              website or webpage and do not have any co-operation with such third
              parties unless otherwise disclosed. We are not in any way responsible
              for the content of any externally linked website or webpage.
            </Typography>
            <Typography variant="body1" paragraph>
              6.3 By clicking on a hyperlink, you will leave the Oakar Services
              webpage and accordingly you shall be subject to the terms of use,
              privacy and cookie policies of the other website that you choose to
              visit.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              7.0 Access to and Updating your Information
            </Typography>
            <Typography variant="body1" paragraph>
              To update your information, go to{' '}
              <Link href="https://selfcare.Kenya Space Agency.co.ke/" target="_blank">
                https://selfcare.Kenya Space Agency.co.ke/
              </Link>{' '}
              and sign in to my Oakar Services self-care to look at
              your personal information. You can change how we get in touch with you
              and your account details whenever you like.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              8.0 Safeguarding and Protection of Information
            </Typography>
            <Typography variant="body1" paragraph>
              Oakar Services has put in place technical and operational measures to
              ensure integrity and confidentiality of your data via controls around:
              information classification, access control, cryptography, physical and
              environmental security and monitoring and compliance.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              9.0 International Data Transfers
            </Typography>
            <Typography variant="body1" paragraph>
              From time to time we may need to transfer your personal information
              outside the Republic of Kenya.
            </Typography>
            <Typography variant="body1" paragraph>
              Where we send your information outside Kenya, we will make sure that
              your information is properly protected in accordance with the
              applicable Data Protection Laws.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              10.0 Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              Subject to legal and contractual exceptions, you have rights under
              data protection laws in relation to your personal data. These are
              listed below:
            </Typography>

            <List>
              <ListItem>
                <ListItemText primary="a) Right to be informed that we are collecting personal data about you;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="b) Right to access personal data that we hold about you and request for information about how we process it;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="c) Right to request that we correct your personal data where it is inaccurate or incomplete;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="d) Right to request that we erase your personal data noting that we may continue to retain your information if obligated by the law or entitled to do so;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="e) Right to object and withdraw your consent to processing of your personal data. We may continue to process if we have a legitimate or legal reason to do so;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="f) Right to request restricted processing of your personal data noting that we may be entitled or legally obligated to continue processing your data and refuse your request;" />
              </ListItem>
              <ListItem>
                <ListItemText primary="g) Right to request transfer of your personal data in an electronic format." />
              </ListItem>
            </List>

            <Typography variant="body1" paragraph>
              If you wish to exercise any of the rights set out above, please contact us on{' '}
              <Link href="mailto:dpo@OakarServices.co.ke">dpo@OakarServices.co.ke</Link>. 
              We may need to request specific information from you to help us confirm your identity and
              ensure your right to access your personal data (or to exercise any of
              your other rights). This is a security measure to ensure that personal
              data is not disclosed to any person who has no right to receive it. We
              may also contact you to ask you for further information in relation to
              your request to speed up our response.
            </Typography>

            <Typography variant="body1" paragraph>
              We try to respond to all legitimate requests within reasonable time.
              Occasionally it could take us longer if your request is particularly
              complex or you have made a number of requests. In this case, we will
              notify you and keep you updated.
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
