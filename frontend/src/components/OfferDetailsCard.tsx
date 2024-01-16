import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

import { Offer, User } from '../types/types';
import { apiUrl } from './Header';

type OfferDetailsCardProps = {
    offer: Offer;
    user: User;
};

export const OfferDetailsCard = ({ user, offer }: OfferDetailsCardProps) => {
    return (
        <Card
            sx={{
                width: 320,
                maxWidth: '100%',
                boxShadow: 'lg',
            }}
        >
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Avatar src={`${apiUrl}?seed=${user.userId}`} sx={{ '--Avatar-size': '4rem' }} />
                <Typography level="title-lg">{user.username}</Typography>
                <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                        mt: 1,
                        mb: -1,
                        border: '3px solid',
                        borderColor: 'background.surface',
                    }}
                >
                    {offer.skill}
                </Chip>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {offer.description}
                </Typography>

            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <Stack justifyContent="center" alignItems="center" sx={{ p: "10px" }}>
                    <Typography level="title-md">Discord username:</Typography>
                    <Typography>{user.discordUsername}</Typography>
                </Stack>
            </CardOverflow>
        </Card>
    );
};