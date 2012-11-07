﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BetEx247.Data.Model;
using BetEx247.Data.DAL.Sports.Interfaces;
namespace BetEx247.Data.DAL.Sports
{
    public partial class SoccerMatchService : ISoccerMatchService
    {
        /// <summary>
        /// 
        /// </summary>
        private readonly BetEXDataContainer _context = new BetEXDataContainer();
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public  List<SoccerMatch> SoccerMatches()
        {
            using (var dba = new BetEXDataContainer())
            {
                var list = dba.SoccerMatches.ToList();

                return list;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="matchID"></param>
        /// <returns></returns>
        public  List<SoccerMatch> SoccerMatches(int matchID)
        {
            using (var dba = new BetEXDataContainer())
            {
                var list = dba.SoccerMatches.Where(w => w.ID == matchID).ToList();

                return list;
            }
        }
        public List<SoccerMatch> SoccerMatches(long leagueID, long matchStatus)
        {
            using (var dba = new BetEXDataContainer())
            {
                var list = dba.SoccerMatches.Where(w => w.LeagueID == leagueID & w.MatchStatusID == matchStatus).ToList();

                return list;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public SoccerMatch SoccerMatch(int ID)
        {
            using (var dba = new BetEXDataContainer())
            {
                var obj = dba.SoccerMatches.Where(w => w.ID == ID).SingleOrDefault();

                return obj;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public SoccerMatch SoccerMatch(long leagueID, String homeTeam, String awayTeam, DateTime startDate, DateTime startTime)
        {
            using (var dba = new BetEXDataContainer())
            {
                var obj = dba.SoccerMatches.Where(w => w.LeagueID == leagueID & w.HomeTeam.Equals(homeTeam) & w.AwayTeam.Equals(awayTeam) & w.StartDate == startDate & w.StartTime == startTime).ToList();

                return obj.Count==0?null:obj[0];
            }
        }


        public long SoccerMatch(SoccerMatch soccerMatch)
        {
            using (var dba = new BetEXDataContainer())
            {
                var obj = dba.SoccerMatches.Where(w => w.LeagueID == soccerMatch.LeagueID & w.HomeTeam.Equals(soccerMatch.HomeTeam) & w.AwayTeam.Equals(soccerMatch.AwayTeam) & w.StartDate == soccerMatch.StartDate & w.StartTime == soccerMatch.StartTime).ToList();

                return  obj.Count==0?0:obj[0].ID;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="soccerCorrectScores"></param>
        /// <returns></returns>
         public bool Insert(SoccerMatch soccerMatch)
        {
            _context.AddToSoccerMatches(soccerMatch);
            int result = _context.SaveChanges();
            return result > 0 ? true : false;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="soccerCorrectScores"></param>
        /// <returns></returns>
         public bool Update(SoccerMatch soccerMatch)
        {
            SoccerMatch _obj = new SoccerMatch();
            _obj = _context.SoccerMatches.Where(w => w.ID == soccerMatch.ID).SingleOrDefault();
            if (_obj != null) // Update
            {
                _obj = soccerMatch;
                int result = _context.SaveChanges();
                return result > 0 ? true : false;
            }
            else //Insert
            {
                return Insert(soccerMatch);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="soccerCorrectScores"></param>
        /// <returns></returns>
        public bool Delete(SoccerMatch soccerMatch)
        {
            _context.DeleteObject(soccerMatch);
            int result = _context.SaveChanges();
            return result > 0 ? true : false;
        }
        public IQueryable<SoccerMatch> Table
        {
            get { throw new NotImplementedException(); }
        }

        public IList<SoccerMatch> GetAll()
        {
            using (var dba = new BetEXDataContainer())
            {
                var list = dba.SoccerMatches.ToList();

                return list;
            }
        }


        void IBase<SoccerMatch>.Insert(SoccerMatch entity)
        {
            throw new NotImplementedException();
        }
    }
}