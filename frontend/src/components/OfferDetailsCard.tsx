import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import FlagIcon from '@mui/icons-material/OutlinedFlag';

import { Offer, User } from '../types/types';
import { useAuth } from '../hooks/useAuth';
import { apiUrl } from './Header';
import { useDeleteOffer } from '../api/offers';
import { ReportForm } from './ReportForm';

type OfferDetailsCardProps = {
    offer: Offer;
    user: User;
};

export const OfferDetailsCard = ({ user, offer }: OfferDetailsCardProps) => {
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const { mutate } = useDeleteOffer(offer.offerId);
    const [open, setOpen] = useState<boolean>(false);

    const reportDropdown = (
        <Dropdown>
            <MenuButton
                sx={{ position: "absolute", right: 0, top: 0 }}
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: "plain", color: "neutral" } }}
                size="sm"
            >
                <MoreIcon />
            </MenuButton>
            <Menu size="sm">
                {currentUser?.userId !== user.userId && (
                    <MenuItem onClick={() => setOpen(true)}>
                        <ListItemDecorator>
                            <FlagIcon />
                        </ListItemDecorator>
                        Report offer
                    </MenuItem>
                )}

                {(currentUser?.role === "admin" || offer.userId === currentUser?.userId) && (
                    <MenuItem onClick={() => {
                        mutate();
                        navigate(-1);
                    }} color="danger">
                        <ListItemDecorator>
                            <DeleteIcon />
                        </ListItemDecorator>
                        Delete offer
                    </MenuItem>
                )}
            </Menu>
        </Dropdown>
    );

    const reportModal = (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
                <DialogTitle>Create new report</DialogTitle>
                <DialogContent>Fill in the information of the report.</DialogContent>
                <ReportForm offerId={offer.offerId} />
            </ModalDialog>
        </Modal>
    );

    return (
        <>
            {reportModal}
            <Card
                sx={{
                    width: 320,
                    maxWidth: '100%',
                    boxShadow: 'lg',
                }}
            >
                {reportDropdown}
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
        </>
    );
};