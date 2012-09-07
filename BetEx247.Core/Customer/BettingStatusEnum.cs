﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BetEx247.Core.CustomerManagement
{
    public enum BettingStatusEnum
    {
        /// <summary>
        /// Pending
        /// </summary>
        Pending = 10,
        /// <summary>
        /// Processing
        /// </summary>
        Processing = 20,
        /// <summary>
        /// Complete
        /// </summary>
        Complete = 30,
        /// <summary>
        /// Cancelled
        /// </summary>
        Cancelled = 40
    }
}
