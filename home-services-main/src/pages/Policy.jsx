import { FiShield, FiLock, FiEye, FiUser, FiDatabase, FiAlertCircle } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <div className="privacy-page">
        <section className="hero-section">
          <div className="hero-content">
            <FiShield className="hero-icon" />
            <h1>Privacy Policy</h1>
            <p className="hero-subtitle">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="last-updated">Last updated: December 2024</p>
          </div>
        </section>

        <section className="policy-section">
          <div className="section-container">
            <div className="policy-content">
              <div className="policy-intro">
                <h2>Introduction</h2>
                <p>
                  At Home Services App, we are committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy explains how we 
                  collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in 
                  accordance with this policy. We will not use or share your information with 
                  anyone except as described in this Privacy Policy.
                </p>
              </div>

              <div className="policy-section-item">
                <FiDatabase className="section-icon" />
                <h2>Information We Collect</h2>
                <div className="subsection">
                  <h3>Personal Information</h3>
                  <ul>
                    <li>Name and contact information (email, phone number)</li>
                    <li>Billing and payment information</li>
                    <li>Service preferences and booking history</li>
                    <li>Profile information and account settings</li>
                  </ul>
                </div>
                <div className="subsection">
                  <h3>Technical Information</h3>
                  <ul>
                    <li>Device information and IP addresses</li>
                    <li>Browser type and version</li>
                    <li>Usage patterns and platform interactions</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
                <div className="subsection">
                  <h3>Location Information</h3>
                  <ul>
                    <li>Service address and location preferences</li>
                    <li>Geographic data for service matching</li>
                    <li>Location-based service recommendations</li>
                  </ul>
                </div>
              </div>

              <div className="policy-section-item">
                <FiEye className="section-icon" />
                <h2>How We Use Your Information</h2>
                <div className="subsection">
                  <h3>Service Delivery</h3>
                  <ul>
                    <li>Processing and managing service bookings</li>
                    <li>Connecting you with verified service providers</li>
                    <li>Facilitating communication between parties</li>
                    <li>Processing payments and billing</li>
                  </ul>
                </div>
                <div className="subsection">
                  <h3>Platform Improvement</h3>
                  <ul>
                    <li>Analyzing usage patterns and user behavior</li>
                    <li>Improving our services and user experience</li>
                    <li>Developing new features and functionality</li>
                    <li>Conducting research and analytics</li>
                  </ul>
                </div>
                <div className="subsection">
                  <h3>Communication</h3>
                  <ul>
                    <li>Sending service updates and confirmations</li>
                    <li>Providing customer support</li>
                    <li>Sending promotional offers (with your consent)</li>
                    <li>Sharing important platform updates</li>
                  </ul>
                </div>
              </div>

              <div className="policy-section-item">
                <FiLock className="section-icon" />
                <h2>Information Sharing and Disclosure</h2>
                <div className="subsection">
                  <h3>Service Providers</h3>
                  <p>
                    We share necessary information with verified service providers to facilitate 
                    service delivery. This includes your contact information, service requirements, 
                    and scheduling preferences.
                  </p>
                </div>
                <div className="subsection">
                  <h3>Third-Party Services</h3>
                  <p>
                    We may share information with trusted third-party service providers who assist 
                    us in operating our platform, such as payment processors, analytics providers, 
                    and customer support tools.
                  </p>
                </div>
                <div className="subsection">
                  <h3>Legal Requirements</h3>
                  <p>
                    We may disclose your information if required by law, legal process, or to 
                    protect our rights, property, or safety, or that of our users or the public.
                  </p>
                </div>
              </div>

              <div className="policy-section-item">
                <FiShield className="section-icon" />
                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information against unauthorized access, alteration, disclosure, or 
                  destruction. These measures include:
                </p>
                <ul>
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication systems</li>
                  <li>Secure data storage and backup procedures</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </div>

              <div className="policy-section-item">
                <FiUser className="section-icon" />
                <h2>Your Rights and Choices</h2>
                <div className="subsection">
                  <h3>Access and Control</h3>
                  <ul>
                    <li>Access your personal information</li>
                    <li>Update or correct your information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </div>
                <div className="subsection">
                  <h3>Data Portability</h3>
                  <p>
                    You have the right to receive a copy of your personal information in a 
                    structured, commonly used format that you can transfer to another service.
                  </p>
                </div>
                <div className="subsection">
                  <h3>Communication Preferences</h3>
                  <p>
                    You can manage your communication preferences through your account settings 
                    or by contacting our support team.
                  </p>
                </div>
              </div>

              <div className="policy-section-item">
                <FiAlertCircle className="section-icon" />
                <h2>Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze 
                  platform usage, and provide personalized content. You can control cookie 
                  settings through your browser preferences.
                </p>
                <div className="subsection">
                  <h3>Types of Cookies</h3>
                  <ul>
                    <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                  </ul>
                </div>
              </div>

              <div className="policy-section-item">
                <h2>Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not 
                  knowingly collect personal information from children under 13. If we become 
                  aware that we have collected personal information from a child under 13, 
                  we will take steps to delete such information.
                </p>
              </div>

              <div className="policy-section-item">
                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of 
                  any changes by posting the new Privacy Policy on this page and updating the 
                  "Last updated" date. You are advised to review this Privacy Policy periodically 
                  for any changes.
                </p>
              </div>

              <div className="policy-section-item">
                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="contact-info">
                  <p><strong>Email:</strong> privacy@homeservicesapp.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Service Street, Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


