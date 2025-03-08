const PrivacyPolicyPage = () => {
  return (
    <div className="mx-auto my-8 w-screen md:w-1/2 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-heading-4 [&_h2]:font-semibold [&_strong]:font-semibold">
      <h1 className="my-2 text-heading-1 font-bold">Privacy Policy</h1>
      <p className="italic text-muted-foreground">Last updated: January 3, 2025</p>
      <h2>Table of Contents</h2>
      <ul className="ml-4 [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-1">
        <li>
          <a href="#information-we-collect">1. Information We Collect</a>
        </li>
        <li>
          <a href="#how-we-use-information">2. How We Use Your Information</a>
        </li>
        <li>
          <a href="#sharing-your-information">3. Sharing Your Information</a>
        </li>
        <li>
          <a href="#data-retention">4. Data Retention</a>
        </li>
        <li>
          <a href="#your-rights">5. Your Privacy Rights</a>
        </li>
        <li>
          <a href="#security">6. Security of Your Information</a>
        </li>
        <li>
          <a href="#third-party-links">7. Third-Party Links and Services</a>
        </li>
        <li>
          <a href="#children">8. Children's Privacy</a>
        </li>
        <li>
          <a href="#updates">9. Updates to This Privacy Policy</a>
        </li>
        <li>
          <a href="#contact">10. Contact Us</a>
        </li>
      </ul>
      <h2 id="introduction">Introduction</h2>
      <p>
        Lapin Learn is committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, and share personal information when you use our app and associated services.
      </p>
      <h2 id="information-we-collect">1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account Information:</strong> We may collect email address when users register an
          account to access our app's features.
        </li>
        <li>
          <strong>Profile Information:</strong> Users may provide additional details such as
          username, full name, date of birth, and gender to enable personalized experiences.
        </li>
        <li>
          <strong>Usage Data:</strong> We collect data on how you interact with our app, such as the
          features you use.
        </li>
      </ul>
      <h2 id="how-we-use-information">2. How We Use Your Information</h2>
      <ul>
        <li>Provide and maintain our app services</li>
        <li>Improve, personalize, and expand our app</li>
        <li>Communicate with you, including customer support</li>
      </ul>
      <h2 id="sharing-your-information">3. Sharing Your Information</h2>
      <ul>
        <li>
          <strong>Third-Party Services:</strong> We may use third-party services like Firebase for
          analytics and user authentication (Google Sign-In). Future integrations with other
          third-party tools for analytics, data storage, or payment processing will be updated in
          this policy.
        </li>
        <li>
          <strong>Internal Use:</strong> We process the majority of user data internally and do not
          share it with external parties, except as outlined in this policy or required by law.
        </li>
      </ul>
      <h2 id="data-retention">4. Data Retention</h2>
      <p>
        We store user data for as long as necessary to provide our services and fulfill the purposes
        outlined in this Privacy Policy, unless a longer retention period is required or permitted
        by law.
      </p>
      <h2 id="your-rights">5. Your Privacy Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data. For any privacy-related
        concerns, please contact us at
        <a href="mailto:lapinlearnproject@gmail.com">lapinlearnproject@gmail.com</a>.
      </p>
      <h2 id="security">6. Security of Your Information</h2>
      <p>
        We implement a variety of security measures to ensure the safety of your personal
        information. This includes encryption, secure data storage, and restricted access to
        sensitive data. However, no system is completely secure, and we cannot guarantee the
        absolute security of your data.
      </p>
      <h2 id="third-party-links">7. Third-Party Links and Services</h2>
      <p>
        Our app may contain links to third-party websites or services. We are not responsible for
        the privacy practices or content of these third parties. We encourage you to review their
        privacy policies before engaging with them.
      </p>
      <h2 id="children">8. Children's Privacy</h2>
      <p>
        Our app is not intended for children under the age of 13. We do not knowingly collect
        personal information from children. If you believe a child under 13 has provided us with
        personal data, please contact us so we can take appropriate action.
      </p>
      <h2 id="updates">9. Updates to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        for other operational, legal, or regulatory reasons. The updated policy will be posted in
        the app, and the "Last updated" date will reflect the changes.
      </p>
      <h2 id="contact">10. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or how your data is handled,
        please contact us at:&nbsp;
        <a
          href="mailto:lapinlearnproject@gmail.com"
          className="text-blue underline underline-offset-2"
        >
          lapinlearnproject@gmail.com
        </a>
      </p>
    </div>
  );
};
export default PrivacyPolicyPage;
