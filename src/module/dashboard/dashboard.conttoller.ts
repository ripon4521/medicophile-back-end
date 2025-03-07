import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const dashboardOverview  = catchAsync(async(req, res) =>{
    //const result = await eventService.createEventIntoDB(req.body);

    const result ={
        summary:[
            {
                name:"Total Students",
                value:"500"
            },
            {
                name:"Total Faculty",
                value:"30"
            },
            {
                name:"Active Courses",
                value:"28"
            },
            {
                name:"Total Meals",
                value:"500"
            },
            {
                name:"Upcoming Events",
                value:"5"
            },
        ],
        recentactivity:[
            {
                user:"John Doe",
                avatar:"JD",
                action:"updated the cafeteria menu",
                time:"2 minutes ago",
            },
            {
                user:"Sarah Smith",
                avatar:"SS",
                action:"added a new bus route",
                time:"15 minutes ago",
            },
            {
                user:"Michael Brown",
                avatar:"MB",
                action:"created a new event",
                time:"1 hour ago",
            },
            {
                user:"Emily Johnson",
                avatar:"EJ",
                action:"updated class schedule",
                time:"1 hour ago",
            }
        ]

    }
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Event Created Successfully",
        data: result,
      });
})


export const dashboardController = {
    dashboardOverview

 };
