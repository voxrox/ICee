
class Adaptivecardss
{
    adaptivecard1(state,description,incidentno,openedat,shortdescription)
    {
        switch (state)
            {
                case "1":
                    state = "New";
                    break;
                case "2":
                    state = "In Progress";
                    break;
                case "3":
                    state = "On Hold";
                    break;
                case "6":
                    state = "Resolved";
                    break;
                case "7":
                    state = "Closed";
                    break;
                case "8":
                    state = "Canceled";
                    break;
            }

    var ticketdetails={
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.0",
        "body": [{
                "type": "Container",
                "items": [{
                    "type": "TextBlock",
                    "text": "Claim Details",
                    "wrap": true
                        }
    
                        ]
                        
                },
                
                {
                    "type": "FactSet",
                    "facts": [
                        {
                        "title": "Claim ID",
                        "value": incidentno
                        },
                        {
                        "title": "State",
                        "value": state
                        },
                        {
                            "title": "Short Description",
                            "value": shortdescription
                            },
                        {
                        "title": "Opened at",
                        "value": openedat+" UTC"
                        },
                        {
                            "title":"Registered by",
                            "value":"Raghu"
                        }
                    ]
                },
                {

                }
            
            ]
    }
    if(description=='-'){
        ticketdetails=JSON.parse(JSON.stringify(ticketdetails))
        ticketdetails.actions= [
            {
              type: "Action.OpenUrl",
              title: "View Attachment",
              url:description

            }
        
          ]
        ticketdetails=JSON.stringify(ticketdetails)  
        //console.log(ticketdetails)
    }
    return ticketdetails
    }
}
    
module.exports.Adaptivecardss=Adaptivecardss
 
