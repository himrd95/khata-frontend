import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeroSection = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
`;

const BackgroundPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
    position: relative;
    z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const HeroSubtitle = styled(motion.p)`
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    color: #4a5568;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    font-weight: 400;
`;

const FeatureGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin: 4rem 0;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
`;

const FeatureCard = styled(motion.div)`
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
`;

const FeatureIcon = styled.div`
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    color: white;
`;

const FeatureTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95rem;
`;

const ButtonGroup = styled(motion.div)`
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 3rem;
`;

const PrimaryButton = styled(motion.button)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
    }

    &:active {
        transform: translateY(0);
    }
`;

const SecondaryButton = styled(motion.button)`
    background: rgba(255, 255, 255, 0.9);
    color: #1a202c;
    border: 2px solid #e2e8f0;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
        background: white;
        border-color: #cbd5e0;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(0);
    }
`;

const FloatingAnimation = styled(motion.div)`
    position: absolute;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-radius: 50%;
    pointer-events: none;
`;

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: "💰",
            title: "Smart Expense Tracking",
            description: "Automatically categorize and track your daily expenses with intelligent insights."
        },
        {
            icon: "📊",
            title: "Visual Analytics",
            description: "Beautiful charts and reports to understand your spending patterns."
        },
        {
            icon: "🔒",
            title: "Secure & Private",
            description: "Your financial data is encrypted and stored securely on your device."
        },
        {
            icon: "⚡",
            title: "Lightning Fast",
            description: "Built for speed with instant sync and real-time updates."
        }
    ];

    return (
        <HeroSection>
            <BackgroundPattern />
            
            {/* Floating animations */}
            <FloatingAnimation
                style={{
                    top: '20%',
                    left: '10%',
                }}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <FloatingAnimation
                style={{
                    top: '60%',
                    right: '15%',
                }}
                animate={{
                    y: [0, 20, 0],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <ContentContainer>
                <HeroTitle
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Take Control of Your
                    <br />
                    <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Financial Life
                    </span>
                </HeroTitle>

                <HeroSubtitle
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    The simplest way to track expenses, manage budgets, and achieve your financial goals. 
                    Start your journey to financial freedom today.
                </HeroSubtitle>

                <FeatureGrid
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FeatureIcon>{feature.icon}</FeatureIcon>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                        </FeatureCard>
                    ))}
                </FeatureGrid>

                <ButtonGroup
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <PrimaryButton
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started Free
                    </PrimaryButton>
                    <SecondaryButton
                        onClick={() => navigate('/login')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign In
                    </SecondaryButton>
                </ButtonGroup>
            </ContentContainer>
        </HeroSection>
    );
};

export default LandingPage; 