import React, {
    useState,
    useRef,
    useEffect,
    memo,
    useMemo,
    useContext,
    useCallback,
} from "react";
import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getBalanceColor, isEmpty } from "../../utils/helpers";
import { provider } from "../../Context/ContextPovider";
import { moneyFormate } from "../../constants";

// Animations
const attention = keyframes`
  0% { transform: translateX(0); }
  5% { transform: translateX(-4px); }
  10% { transform: translateX(4px); }
  15% { transform: translateX(-4px); }
  20% { transform: translateX(4px); }
  25% { transform: translateX(0); }
  30% { transform: translateY(0); }
  35% { transform: translateY(-4px); }
  40% { transform: translateY(4px); }
  45% { transform: translateY(-3px); }
  50% { transform: translateY(0); }
  100% { transform: translateY(0); }
`;

const Card = styled.div`
    width: 100%;
    border-radius: 4px 4px 24px 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: height 0.4s ease;
    position: relative;

    margin-top: 10px;
`;

const Content = styled.div`
    padding: 0;
`;

const ExtraContent = styled.div`
    opacity: ${({ expanded }) => (expanded ? 1 : 0)};
    transition: opacity 0.3s ease, height 0.3s ease;
    transform: ${({ expanded }) => (expanded ? "scale(1)" : "scale(0)")};
    height: ${({ contentHeight }) => `${contentHeight}px`};
    overflow: hidden;
`;

const ToggleButton = styled.div`
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
`;

const Chevron = styled(FontAwesomeIcon)`
    transition: transform 0.3s ease;
    ${({ expanded }) =>
        expanded
            ? css`
                  transform: rotate(180deg);
              `
            : css`
                  animation: ${attention} 4s ease-in-out infinite;
              `}
`;

const TotalBalanceRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px 4px 24px 24px;
    padding: 12px 20px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    background: ${({ background }) => background};
`;

const TotalBalanceLabel = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #444;
`;

const TotalBalanceValue = styled.span`
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin-left: 8px;
    letter-spacing: 1px;
    color: #032b5c;
`;

const ExpandableCard = () => {
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);
    const { totalBalnce, currentUser, totalGivenByAdmin, totalTakenByAdmin } =
        useContext(provider);

    const balanceColor = useCallback(
        (amount) => {
            const color = getBalanceColor(amount);
            return `linear-gradient(180deg, rgba(255,255,255,1) 0%, ${color} 300%)`;
        },
        []
    );

    useEffect(() => {
        if (contentRef.current && expanded) {
            const height = contentRef.current.scrollHeight;
            setContentHeight(height);
        } else {
            setContentHeight(0);
        }
    }, [expanded]);

    useEffect(() => {
        if (!isEmpty(currentUser)) {
            setExpanded(false);
        }
    }, [currentUser]);

    return (
        <Card>
            <div>
                <Content>
                    <ExtraContent
                        ref={contentRef}
                        expanded={expanded}
                        contentHeight={contentHeight}
                    >
                        <TotalBalanceRow
                            background={balanceColor(totalGivenByAdmin)}
                        >
                            <TotalBalanceLabel>Total Given</TotalBalanceLabel>
                            <TotalBalanceValue>
                                {` ${moneyFormate(totalGivenByAdmin)}`}
                            </TotalBalanceValue>
                        </TotalBalanceRow>
                        <TotalBalanceRow
                            background={balanceColor(-totalTakenByAdmin)}
                        >
                            <TotalBalanceLabel>Total Taken</TotalBalanceLabel>
                            <TotalBalanceValue>
                                {`-${moneyFormate(totalTakenByAdmin)}`}
                            </TotalBalanceValue>
                        </TotalBalanceRow>
                    </ExtraContent>

                    <TotalBalanceRow
                        background={balanceColor(totalBalnce)}
                    >
                        <TotalBalanceLabel>Total Balance</TotalBalanceLabel>
                        <TotalBalanceValue>
                            {` ${moneyFormate(totalBalnce)}`}
                        </TotalBalanceValue>
                    </TotalBalanceRow>
                </Content>
            </div>
            {isEmpty(currentUser) && (
                <ToggleButton onClick={() => setExpanded(!expanded)}>
                    <Chevron icon={faChevronDown} expanded={expanded} />
                </ToggleButton>
            )}
        </Card>
    );
};

export default memo(ExpandableCard);
