import totaltick from "../../assets/svg/total-ticket.svg";
import acttick from "../../assets/svg/active-ticket.svg";
import canceltick from "../../assets/svg/cancel-ticket.svg";
import useUserTicket from "../../CustomHook/useUserTicket";

export default function useData() {
    const [Tticket, Atticket, Cticket] = useUserTicket();
    const badgeData = [
        {
            "src": totaltick,
            "no": Tticket,
            "type": "Total Tickets",
            "color": "#465FF5"
        },
        {
            "src": acttick,
            "no": Atticket,
            "type": "Active Tickets",
            "color": "#465FF5"
        },
        {
            "src": canceltick,
            "no": Cticket,
            "type": "Closed Tickets",
            "color": "#465FF5"
        }
    ]
    return badgeData
}