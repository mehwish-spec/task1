import PageLayout from '../components/layout/PageLayout.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/hero/Hero.jsx';
import Features from '../components/features/Features.jsx';
import BlueFeature from '../components/blueFeature/BlueFeature.jsx';
import Pricing from '../components/pricing/Pricing.jsx';
import StudentCards from '../components/studentCards/StudentCards.jsx';
import Faq from '../components/faq/Faq.jsx';
import TrustBadges from '../components/trustBadges/TrustBadges.jsx';
import SiteFooter from '../components/layout/SiteFooter.jsx';

function Home() {
  return (
    <PageLayout>
      <Hero />
      <Features />
      <BlueFeature />
      <Pricing />
      <StudentCards />
      <Faq />
      <Footer />
      <TrustBadges />
      <SiteFooter />
    </PageLayout>
  );
}

export default Home;
