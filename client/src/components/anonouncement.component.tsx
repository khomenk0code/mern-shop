import React, {useEffect, useState} from 'react';
import styled from "styled-components";


const Announcement: React.FC = () => {
    const [showAnnouncement, setShowAnnouncement] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnnouncement(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return showAnnouncement ? (
        <Container>
            Super Deal! Free Shipping to Ukraine on Orders Over 50$
        </Container>
    ) : null;
}

const Container = styled.div`
  height: 2rem;
  background-color: #008080;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`

export default Announcement;
