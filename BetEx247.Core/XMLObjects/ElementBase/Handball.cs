﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using XMLBettingObjects.ElementsBase;
using XMLBettingObjects.Event;
namespace XMLBettingObjects.ElementsBase
{
    class Handball:BaseSport
    {
         public Handball()
        {
        }
         public Handball(int id, String name, List<EventObject> events)
             : base(id, name, events)
        {
           
        }
    }
}
