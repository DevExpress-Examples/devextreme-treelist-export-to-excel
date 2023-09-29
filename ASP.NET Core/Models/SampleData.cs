using ASP.NET_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models {
    static class SampleData {
        public static List<Employee> Employees = new List<Employee>()
        {
            new Employee {
                ID = 1,
                HeadID = 0,
                FullName = "John Heart",
                Prefix = "Mr.",
                Title ="CEO",
                City = "Los Angeles",
                State = "California",
                Email = "jheart@dx-email.com",
                Skype = "jheart_DX_skype",
                MobilePhone = "(213) 555-9392",
                BirthDate = DateTime.Parse("1964/03/16"),
                HireDate = DateTime.Parse("1995/01/15")
            },
            new Employee {
                ID = 2,
                HeadID = 1,
                FullName = "Samantha Bright",
                Prefix = "Dr.",
                Title ="COO",
                City = "Los Angeles",
                State = "California",
                Email = "samanthab@dx-email.com",
                Skype = "samanthab_DX_skype",
                MobilePhone = "(213) 555-2858",
                BirthDate = DateTime.Parse("1966/05/02"),
                HireDate = DateTime.Parse("2004/05/24")
            },
            new Employee {
                ID = 3,
                HeadID = 1,
                FullName = "Arthur Miller",
                Prefix = "Mr.",
                Title ="CTO",
                City = "Denver",
                State = "Colorado",
                Email = "arthurm@dx-email.com",
                Skype = "arthurm_DX_skype",
                MobilePhone = "(310) 555-8583",
                BirthDate = DateTime.Parse("1972/07/11"),
                HireDate = DateTime.Parse("2007/12/18")
            },
            new Employee {
                ID = 4,
                HeadID = 1,
                FullName = "Robert Reagan",
                Prefix = "Mr.",
                Title ="CMO",
                City = "Bentonville",
                State = "Arkansas",
                Email = "robertr@dx-email.com",
                Skype = "robertr_DX_skype",
                MobilePhone = "(818) 555-2387",
                BirthDate = DateTime.Parse("1974/09/07"),
                HireDate = DateTime.Parse("2002/11/08")
            },
            new Employee {
                ID = 5,
                HeadID = 1,
                FullName = "Greta Sims",
                Prefix = "Ms.",
                Title ="HR Manager",
                City = "Atlanta",
                State = "Georgia",
                Email = "gretas@dx-email.com",
                Skype = "gretas_DX_skype",
                MobilePhone = "(818) 555-6546",
                BirthDate = DateTime.Parse("1977/11/22"),
                HireDate = DateTime.Parse("1998/04/23")
            },
            new Employee {
                ID = 6,
                HeadID = 3,
                FullName = "Brett Wade",
                Prefix = "Mr.",
                Title ="IT Manager",
                City = "Reno",
                State = "Nevada",
                Email = "brettw@dx-email.com",
                Skype = "brettw_DX_skype",
                MobilePhone = "(626) 555-0358",
                BirthDate = DateTime.Parse("1968/12/01"),
                HireDate = DateTime.Parse("2009/03/06")
            },
            new Employee {
                ID = 7,
                HeadID = 5,
                FullName = "Sandra Johnson",
                Prefix = "Mrs.",
                Title ="Controller",
                City = "Beaver",
                State = "Utah",
                Email = "sandraj@dx-email.com",
                Skype = "sandraj_DX_skype",
                MobilePhone = "(562) 555-2082",
                BirthDate = DateTime.Parse("1974/11/15"),
                HireDate = DateTime.Parse("2005/05/11")
            },
            new Employee {
                ID = 8,
                HeadID = 4,
                FullName = "Ed Holmes",
                Prefix = "Dr.",
                Title ="Sales Manager",
                City = "Malibu",
                State = "California",
                Email = "edwardh@dx-email.com",
                Skype = "edwardh_DX_skype",
                MobilePhone = "(310) 555-1288",
                BirthDate = DateTime.Parse("1973/07/14"),
                HireDate = DateTime.Parse("2005/06/19")
            },
            new Employee {
                ID = 9,
                HeadID = 3,
                FullName = "Barb Banks",
                Prefix = "Mrs.",
                Title ="Support Manager",
                City = "Phoenix",
                State = "Arizona",
                Email = "barbarab@dx-email.com",
                Skype = "barbarab_DX_skype",
                MobilePhone = "(310) 555-3355",
                BirthDate = DateTime.Parse("1979/04/14"),
                HireDate = DateTime.Parse("2002/08/07")
            },
            new Employee {
                ID = 10,
                HeadID = 2,
                FullName = "Kevin Carter",
                Prefix = "Mr.",
                Title ="Shipping Manager",
                City = "San Diego",
                State = "California",
                Email = "kevinc@dx-email.com",
                Skype = "kevinc_DX_skype",
                MobilePhone = "(213) 555-2840",
                BirthDate = DateTime.Parse("1978/01/09"),
                HireDate = DateTime.Parse("2009/08/11")
            },
            new Employee {
                ID = 11,
                HeadID = 5,
                FullName = "Cindy Stanwick",
                Prefix = "Ms.",
                Title ="HR Assistant",
                City = "Little Rock",
                State = "Arkansas",
                Email = "cindys@dx-email.com",
                Skype = "cindys_DX_skype",
                MobilePhone = "(818) 555-6655",
                BirthDate = DateTime.Parse("1985/06/05"),
                HireDate = DateTime.Parse("2008/03/24")
            },
            new Employee {
                ID = 12,
                HeadID = 8,
                FullName = "Sammy Hill",
                Prefix = "Mr.",
                Title ="Sales Assistant",
                City = "Pasadena",
                State = "California",
                Email = "sammyh@dx-email.com",
                Skype = "sammyh_DX_skype",
                MobilePhone = "(626) 555-7292",
                BirthDate = DateTime.Parse("1984/02/17"),
                HireDate = DateTime.Parse("2012/02/01")
            },
            new Employee {
                ID = 13,
                HeadID = 10,
                FullName = "Davey Jones",
                Prefix = "Mr.",
                Title ="Shipping Assistant",
                City = "Pasadena",
                State = "California",
                Email = "davidj@dx-email.com",
                Skype = "davidj_DX_skype",
                MobilePhone = "(626) 555-0281",
                BirthDate = DateTime.Parse("1983/03/06"),
                HireDate = DateTime.Parse("2011/04/24")
            },
            new Employee {
                ID = 14,
                HeadID = 10,
                FullName = "Victor Norris",
                Prefix = "Mr.",
                Title ="Shipping Assistant",
                City = "Little Rock",
                State = "Arkansas",
                Email = "victorn@dx-email.com",
                Skype = "victorn_DX_skype",
                MobilePhone = "(213) 555-9278",
                BirthDate = DateTime.Parse("1986/07/23"),
                HireDate = DateTime.Parse("2012/07/23")
            },
            new Employee {
                ID = 15,
                HeadID = 10,
                FullName = "Mary Stern",
                Prefix = "Ms.",
                Title ="Shipping Assistant",
                City = "Beaver",
                State = "Utah",
                Email = "marys@dx-email.com",
                Skype = "marys_DX_skype",
                MobilePhone = "(818) 555-7857",
                BirthDate = DateTime.Parse("1982/04/08"),
                HireDate = DateTime.Parse("2012/08/12")
            },
            new Employee {
                ID = 16,
                HeadID = 10,
                FullName = "Robin Cosworth",
                Prefix = "Mrs.",
                Title ="Shipping Assistant",
                City = "Los Angeles",
                State = "California",
                Email = "robinc@dx-email.com",
                Skype = "robinc_DX_skype",
                MobilePhone = "(818) 555-0942",
                BirthDate = DateTime.Parse("1981/06/12"),
                HireDate = DateTime.Parse("2012/09/01")
            },
            new Employee {
                ID = 17,
                HeadID = 9,
                FullName = "Kelly Rodriguez",
                Prefix = "Ms.",
                Title ="Support Assistant",
                City = "Boise",
                State = "Idaho",
                Email = "kellyr@dx-email.com",
                Skype = "kellyr_DX_skype",
                MobilePhone = "(818) 555-9248",
                BirthDate = DateTime.Parse("1988/05/11"),
                HireDate = DateTime.Parse("2012/10/13")
            },
            new Employee {
                ID = 18,
                HeadID = 9,
                FullName = "James Anderson",
                Prefix = "Mr.",
                Title ="Support Assistant",
                City = "Atlanta",
                State = "Georgia",
                Email = "jamesa@dx-email.com",
                Skype = "jamesa_DX_skype",
                MobilePhone = "(323) 555-4702",
                BirthDate = DateTime.Parse("1987/01/29"),
                HireDate = DateTime.Parse("2012/10/18")
            },
            new Employee {
                ID = 19,
                HeadID = 9,
                FullName = "Antony Remmen",
                Prefix = "Mr.",
                Title ="Support Assistant",
                City = "Boise",
                State = "Idaho",
                Email = "anthonyr@dx-email.com",
                Skype = "anthonyr_DX_skype",
                MobilePhone = "(310) 555-6625",
                BirthDate = DateTime.Parse("1986/02/19"),
                HireDate = DateTime.Parse("2013/01/19")
            },
            new Employee {
                ID = 20,
                HeadID = 8,
                FullName = "Olivia Peyton",
                Prefix = "Mrs.",
                Title ="Sales Assistant",
                City = "Atlanta",
                State = "Georgia",
                Email = "oliviap@dx-email.com",
                Skype = "oliviap_DX_skype",
                MobilePhone = "(310) 555-2728",
                BirthDate = DateTime.Parse("1981/06/03"),
                HireDate = DateTime.Parse("2012/05/14")
            },
            new Employee {
                ID = 21,
                HeadID = 6,
                FullName = "Taylor Riley",
                Prefix = "Mr.",
                Title ="Network Admin",
                City = "San Jose",
                State = "California",
                Email = "taylorr@dx-email.com",
                Skype = "taylorr_DX_skype",
                MobilePhone = "(310) 555-7276",
                BirthDate = DateTime.Parse("1982/08/14"),
                HireDate = DateTime.Parse("2012/04/14")
            },
            new Employee {
                ID = 22,
                HeadID = 6,
                FullName = "Amelia Harper",
                Prefix = "Mrs.",
                Title ="Network Admin",
                City = "Los Angeles",
                State = "California",
                Email = "ameliah@dx-email.com",
                Skype = "ameliah_DX_skype",
                MobilePhone = "(213) 555-4276",
                BirthDate = DateTime.Parse("1983/11/19"),
                HireDate = DateTime.Parse("2011/02/10")
            },
            new Employee {
                ID = 23,
                HeadID = 6,
                FullName = "Wally Hobbs",
                Prefix = "Mr.",
                Title ="Programmer",
                City = "Chatsworth",
                State = "California",
                Email = "wallyh@dx-email.com",
                Skype = "wallyh_DX_skype",
                MobilePhone = "(818) 555-8872",
                BirthDate = DateTime.Parse("1984/12/24"),
                HireDate = DateTime.Parse("2011/02/17")
            },
            new Employee {
                ID = 24,
                HeadID = 6,
                FullName = "Brad Jameson",
                Prefix = "Mr.",
                Title ="Programmer",
                City = "San Fernando",
                State = "California",
                Email = "bradleyj@dx-email.com",
                Skype = "bradleyj_DX_skype",
                MobilePhone = "(818) 555-4646",
                BirthDate = DateTime.Parse("1988/10/12"),
                HireDate = DateTime.Parse("2011/03/02")
            },
            new Employee {
                ID = 25,
                HeadID = 6,
                FullName = "Karen Goodson",
                Prefix = "Miss",
                Title ="Programmer",
                City = "South Pasadena",
                State = "California",
                Email = "kareng@dx-email.com",
                Skype = "kareng_DX_skype",
                MobilePhone = "(626) 555-0908",
                BirthDate = DateTime.Parse("1987/04/26"),
                HireDate = DateTime.Parse("2011/03/14")
            },
            new Employee {
                ID = 26,
                HeadID = 5,
                FullName = "Marcus Orbison",
                Prefix = "Mr.",
                Title ="Travel Coordinator",
                City = "Los Angeles",
                State = "California",
                Email = "marcuso@dx-email.com",
                Skype = "marcuso_DX_skype",
                MobilePhone = "(213) 555-7098",
                BirthDate = DateTime.Parse("1982/03/02"),
                HireDate = DateTime.Parse("2005/05/19")
            },
            new Employee {
                ID = 27,
                HeadID = 5,
                FullName = "Sandy Bright",
                Prefix = "Ms.",
                Title ="Benefits Coordinator",
                City = "Denver",
                State = "Colorado",
                Email = "sandrab@dx-email.com",
                Skype = "sandrab_DX_skype",
                MobilePhone = "(818) 555-0524",
                BirthDate = DateTime.Parse("1983/09/11"),
                HireDate = DateTime.Parse("2005/06/04")
            },
            new Employee {
                ID = 28,
                HeadID = 6,
                FullName = "Morgan Kennedy",
                Prefix = "Mrs.",
                Title ="Graphic Designer",
                City = "San Fernando Valley",
                State = "California",
                Email = "morgank@dx-email.com",
                Skype = "morgank_DX_skype",
                MobilePhone = "(818) 555-8238",
                BirthDate = DateTime.Parse("1984/07/17"),
                HireDate = DateTime.Parse("2012/01/11")
            },
            new Employee {
                ID = 29,
                HeadID = 28,
                FullName = "Violet Bailey",
                Prefix = "Ms.",
                Title ="Jr Graphic Designer",
                City = "La Canada",
                State = "California",
                Email = "violetb@dx-email.com",
                Skype = "violetb_DX_skype",
                MobilePhone = "(818) 555-2478",
                BirthDate = DateTime.Parse("1985/06/10"),
                HireDate = DateTime.Parse("2012/01/19")
            },
            new Employee {
                ID = 30,
                HeadID = 5,
                FullName = "Ken Samuelson",
                Prefix = "Dr.",
                Title ="Ombudsman",
                City = "St. Louis",
                State = "Missouri",
                Email = "kents@dx-email.com",
                Skype = "kents_DX_skype",
                MobilePhone = "(562) 555-9282",
                BirthDate = DateTime.Parse("1972/09/11"),
                HireDate = DateTime.Parse("2009/04/22")
            }
        };
    }
}
