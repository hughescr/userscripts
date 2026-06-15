// ==UserScript==
// @name         Bluesky Thread Unroller
// @namespace    https://github.com/hughescr/userscripts
// @version      1.0.3
// @description  Adds an "Unroll thread" link to each bsky.app post, just left of Save, that opens the post on tbsky.app.
// @author       Craig R. Hughes
// @match        https://bsky.app/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAfzElEQVR42u17V7Nt2XXWN8acK+148s23b2d1kNQtK1mW3G0lW8KWExibogoXPMAPgFee+BcUVX6BKgoBLuxCwRYWsowESG5ZaoWO6tt908k7rjDnHGPwsM7tNqGslq4pXIVX1ax1wj77rPHtb6Rvjgn89fX/90V/FR7iF/7234CZIStz+EkJKhnmFAJBCgFd2yLULVIdobWCEyMTj4wyiAheevElDAYDAMDLL770Y/1v/5M+9G/81qdBBHjnMZ0MYCaYzZboOgFTDsDw2c/+x7/wPX72Mx+HAQghoogEy82bWga1zBjeDGxmbGY4WwpAyJCIKBJRvHX7puzu7EBV0bTtj23HTwwAUb8AEBGRWf9DIhgA+1F//+FPPvMmBSWp00E+cJ4fJkfvZc9Pm9OHYHROlSt27JlZiGllZG8Y2cuq+t8V8tzu9t4Pj4+PQ9t1mnn/f88FPvNrn8C73nMZN66f4tKlKYgJ/+yf/j5+7dffV21vj0szcfPZKtZ1XA+HRYpB0cWEVWMoMsIffOFLb77Xz33mk4AalAxx3bpiY3Cx2B6+q5xWP5UNs3f6gh8lssuqOo1d4K5p0axqtOs2hWU4To3coIDvOnF/FpvwtWax+v7WhUuzejYDzDAYjfC1r371L5cBREBKAmIiImTMVPyDf/iRjRT0Qlm6DVXL8pLWgL9tRocGNABFkKUgwAef+Ri+/p/fAsF5D00xyybVOb9ZPVteHP/qYHvwnnLgpmXuSq/INCmHJqBZF3CZAxz5IGk7pDAOXbrGid6vUe4Ts397un/nT8fjSR1Cpz8OA9zbedHHf/5nEbqEGBSxS2VV5Y8Ohtkzw2H+8Y2N/JnJNHt/ntvTRPJOQB9X0asSU6mibUyozWCGDA8+9A5ce+JBEBnif30D7oGtK353+Onq4uRXxxfGH9rYG13cnFbl5rjy46rgQZ4hcw6OGWYGMUVIwlEs66IOQtStGHTDwFWeFcvc+wNyPvgsw5X77sMb16/fOwOe+bkPQdWgonR6Wpfnz08fLcvsU9vbo09Nx/mDeYZRTImXyxbDcWZHh+t4etIdhoT/IlH+QMy+FoVuZc4FAIAZDCD3/itTtzF4X3ll82+NLo8/MN2squ1RiY08w4AdSAypjViBwKLo2gJdl1BVhhA92taj6zqKLj3glD6TyLUCd2c0yF4UMTGY3bML/OxHPwQDkOUOMFdu746funTf1i9evbL5zH2XN969uVGNck9o2oDZosNg1AFuhWir6bJbFqltNsXagqBfgsbb4Ez8sDQiG2nunvKbg48WO6PHhzvT0XRcYnNYYpplqJhgURBcC5WELkTkZY6sUbgccDmDcwfOM1IX8hTtkhN7Okv0XBYw997vwyzdMwCmPYivvnCbH3/q6vndixsfv//RC7/+wH07V66cm1ajsoQjRhsUg3GCKwJaW2Mlc3dYH13V9elWbOZq2i1g9ife7HB2aWC7C93TcfZzfmf0kWI62BwOBxgNhxgNSgwKhwIGDRFmBtdFcJ5AXgBPIMeA82CfweUl4AOCdYyY7vOEnykyd9tn7hTAvQOQVR4AePfyxtRX2SOTnfG7dy5s37e1t11ONzcwLAbwlKNKgDpBLRGDeoViNUE2qZgX5Tit/ftjXByatTdLyPGl12oK5wcXaFy8y03L+/NBWRRlhbIcoBiUyDNGZooEBgcFXAk4gzHB2EPZwyiDcQa4BLgO4IwSwrmg+q6g9s1K8Zwa6mc/8Qv48h98/icHYLI9AQBfhXRhuDl+92BjdH81HefFcIKs3ITPJsioAjwjSwpXd6BBDRpMwKMhMKyoy/3FpvE/DT39ilHzvHh25OiyVdllrvKhz3JkLofPCnCWA46gpkgERDJEAAkMIYcED0EGoQDlAsYR4BxwOYS6YbB4LWq6rEhFMgKg98aAzb1tAOZT1IvjzeEjWVVtq8/JfAW4MZg2AAwhzIheELOAlA2QsgopzxALQusitxS3MoQ9c7JhmSuRuXPwNIBzcOzhyYOJATCSEcQIwQydGoL2906BYIQIh4QMggRFBCgDOIOR42TdSKzdMLbydFVgNKjvDYDBtGeARNkuhtUloWy47oB1ZNRSgN0AhCEaAxYqmFuGJQrUVKL1OVpPaF1AQJsJ6qlxt2VOx8a0o4AXATQBkoCUDG0wJAZMgS441J1hFRTroKgT0AqjsxwRfZ8glKDUwaiFsEcyl5lD6Tznr7x6Hg9cuHlvAIgxAIPCZUkpb1p1i7XidK0oK0NggBmoE3DaAfOOsYg5lupRGyMgIWGFhFMyqgpjP1KEqaoMU1KfoiIGRWgT6lxASGBmmDK6FqhbwqplrDqHOni0ySEokMwgpBAkCOVQ8lAGQEqcKeeFY8w2URSn9wbAet31mVusTcCa5m3MT2pQvkakGqNhA/Y5muhwtCTsLxyOa8a8M6yjoUsDiA5gKM3gBWaqIiyRfeyEqI6oiw6LrIWB0QUFkQPUIXSEem1Yrg3LmlE3GdrACJGRlCFmUAgUHZQ94AzEkpxPgdjizvtOwezuEYBFDRjUVGddinckdys+Xu4qD9HpHINhCfIZulRhVuc4XhJOV4xlI2gbQ+wEJgo2NUKqoWFukiqNnFITTeuAZdbCuQwiQNMKmDxMHVJwaBrCem2oG6DtPLrOISaPlBxUCWYCIwZIwdzBuzwQ0Tql2N6/sUKScI8AnCwBQrQk17nJnu9M3x1cfm3deZqtS1RDAmWGIBOsugEWTY7Z0mM+EywXLZr1GhZrZNTVHunYRI7ZiBEwS+sowg0YHiaEto7I8wJMGWAeEnuDm7pfdd1Xf6HLkaKHCJ/VOgajCM8cPcuRo3QEaMhdwqo5uTcAwroGgGhRbyDG5wPsVkc+1a3Ll+sM+UBBmSKhQRMnWLdDrOocq6VgOV+gWc2N06wtafVGxuG2Ci89kcWoB7oObTACgaHJ0BUBme/gOAcsg6QMMXi0XY6uzdG0Hl0HpECQ6KCCngUgAGSMtPBaX3fa3CFIJCiqYnJvAPhBiW7Z2HqKxh/WL2rb/jHW4QKPu0fdOG5QUQNZA+MpOt1AGwaomwLNWlEvlob6YDaUW98Z4s7nSpy8mMI6pDUvO9LXg8dRCEEkiottRJYV8D4Hcw5YDpUckjJ0ISFERYiMGLj/9JNAAkFigoqAIGBdH7IefkNw/INGqVMjfPXzX7hHBsxWaOoAXgtU6Th16Y+kjZW1ora2p5PvCs06MrdEtAW6WKJuMoRGjbo6VnZ8c0i3/9OQDj+X69F1RWOD/aw7HsoNzd1LJunxkHQndcnFLMD7AkQZgAKmOURyxCRIoohn6VISQcQgAUghwqSBszo5m19HOP5G1915JbVFeHut0I9oh6+/+kNcvHwVVeGxtzlIjuXUOzpyQEKSkaVuLF1dSrOmWK+gzRzcnaBIB9jg27Pd7Nbz2/7wcyO3+EZeVM07HjqH1+o5MkChRinJRujCxa4NpXQRqUuQoEhdv+Lde1BIQG90Z0hBENqIFFo4mYcKhy+W6dbnXDz4Unzhm3fKSw/aC9/6+l+OHnDrxuv42Kfei+FGib/7jz4kd15fpEmV+42B290e49Lm0DbGhdK4SNgsO+wMapwfze3i6GR2bnB6fZLXr+Yeh1VJIaRE29OhkVlnghNJwinG+2IXNiVEkphIg1IKbxmfWkEK2hveGVInSF2Axk5Imm6A49fGuPOFyvY/j1S/XF15LNTzY2zt7GF2fPCTS2Kf+syzGE9LtE3Egw+fA3uH9aobm9q793Ynz+5sDz9eFvwEsd8OiamLjCBAjIrUdRbq9bxert44OalfWK7kWwT+s9zz98nkjUQ+YJ3oKHQPrkL3mUXTfnTVhcdbxUXhMgdXBB6CUEJRwqyEaAVJJcwKgL0V3m4PfPvdsTv56pAOvpLJ0beTdDNR0tmixY2Xv3NvkpjzjHc8eRHf/dYNdo6KvQvT6eHB8p2O6VP3P7T70UcfOvfw9rgqqsKTiqFLgnWbsFolzOaB9g/Xk5t3Fo8u0+x+xNV7Ukj/jQxfdkzPeabXaVIsNkP2Rrbi33VqK9NUSBu3JDReTB2xwSzBkKAWYRqgWoPZwedsI5f2N/P2T8Z+/fte6peIZa25UwLh+T99e8b/HwH4rb/3i4gxoSxzzE9aLBfNsK7DE8z0wUtXt94/Hg+evnZ1975LF3erzdEAZeGhaghRUNcR80GCzwKCNbyKw3xcl/k6zgaL+bIUjZfGpf9w7vGd1HTfZJFvl5nfx874lYyro1EK3bqJw67t/VxigKhCNcLQAsRwTuF9slEWdeglVZxWEy/r45aVCdi7PMVHnv0w/vjLP4Eo+pu//Wl4z6gGFYmgPD1abV27f+/xnZ3pxzY2xx+fbo8e2tmeDs9vb7jRcApflDCXwVzfenIu8EVCVkaUwwbDaYVpXWLZFbRo3Lmu67YHRfkeLvhpsuX9xusLlMvN0TR7cHNSTNQpd+sOYR3QrRNCYwgBiBEQExgCzAJMa/IpTE3xjja5D7SJnQPfJtD6madei5+9ufXjy+K/8MvPwDkGE8FAxc72+JH7ru09c/+D557d2h49UYyqq67wg/FwgPNbG9iaTOFc0ffj6AuT0AlW64TjecDBSYv9kxq3DpZ4/eYM16/vY7XsMB5NMBllHWhxK7rZzVjVi3LTj6Zb42vDMt9zIgVCotBEdHXEug5omoSmDehCh6ap0TaNtat2lep4aA295KP7VsX+a1Xmn6uq7MZpjFpmHjkYBuCPvvBHf3EW+OXf+Hk4xxAxKko3mm5U77h67fwnnn7qkV956ulHP7J7fuccvM+JmcqiwGQ0wqAaw3gAxQBACVABowxJPLrk0CRGGx26lKHpGKu1og6ExBlQeec3Mc12+VKx6x+YnBtc3d2dTne3x9nu1pi2t0bYmFYYTwoMhhmqgUNWEFwOgAEDUxDKu4SNLtiVmHDVFCMDik6V4dg5ZvWgZGq2e+kyrly7Dzevv/6/A/DTH3k/huMKZVlhvVoP8tI/+sDD53/pvR947FefeueTT5zbvTypO+KjxYpAwHhUYTIcocjGUAxhNgChACED4BHVoU0OTexXl3I0ncOySViHBi0WkHJO2Xak0TnPm9sDt7c14Z3JkDaqEoPMI2cGW69JiihEDEEUSQxRCGoMVUeqjkTYx4RRF/VcSPIOIzySZW6ncK7zRvMi+u7qa1/G8fgyLl6+iFs3/meNwNerGnVdQZJk063hg5eubH/isScf/NSTTzz27kvnHsq7lGFeLzGvO0xGDkWe99RHBbIB2Eow+Gw3TGDsAZ/B5QV8HqC8RnIruKFiYBElNyimEYPtAsPNIbY2JtgdDTDJPSoCIALRiEQJDAbBAWAQeRDncI7hM4+88EiDHDFkiLHLuq6+2MV4QZgeIuEHiLEXVM4R4rdPr37oVjKqQxA8/cEPYr3u8OJ3nusBYCK8+uJtfuSxy5sXr+584N3vfeSX3vmux5/c27qWCzZwVNc4XrdoU4cpl/BZDuYSQAlCCUYJJoJAoSpQYhg7kGfAtWh1jrWewkZH2NmssblRoBqPEL1HXo0wHk4wGg4w9IycFBYjggI+BLBzYO9A3oO8wHmC8w7OObBncObgSoZPDq4jhNRRIzTW4B9vjc4VZO+sQF/0hi9YiC8lQQcLJn8u9vut81solvV0uj1+79UHLn70kccffPLS5YdHyM7jTk344fECh8sFTCPIVWCXgagAIQcjB1HWb3BCIQQYO5hT1KnGSXOC03ATUhxgexqwsznE9mYJzjKcNgqlEsNigEFRocgImQkEgMQIcg7kHOA84DIQA+wS2DmQ7wFm7+Byhi8dXEngwEjRIMENI/uh5LRrFsvMmowsfslZ+n49my+5GOKBR5/Eqy88D3/z1X33wBOXr1x68PwnL99/5QObOxeHmu1iP1S4fnKC6/v7aFYLbFR2prBkAHkQPPiMnmaGM0ELiRiddjhYHuCN2YuY6+sYbjW4vDfG+a0JvHNYtgk+BoAzlLlHkXtkDnAGWHIgZhgzjByMsj5XnX0PToBj8JuLwJ7hC0MqCJIiNDGMxpC8Khtpn+ri6TSHDDyJ+GL0gy5p7ZjsoYcegN+5uLW3tTd96MJ95967c/HiVa72/EE3whsnhFdvznF0cIASS2wOPIg9lBwABwKDQFAzJBiUGEqM2WqJ60e38PrsZSzkBoYbHS6dG+Pq3jZGxQjLOqJrGoCBPPcoMofMM5gBiAJEUCIY8dkeAM4W9aAwwdgB7i4L6MwdCL5gxBawoBApILxJ6nRMmj9mmgVJpx0hRUfxe2SUjDP47XMbj27tbj6yubdzPhtv+XkYYX/l8NIbLW7fPIWuTpCNWhBPAPJQ60UIu2u8GQIMEYRGEm6e3sELt7+Lw/omqknC5b0tXNnbwWQwQNMpTpsW8zYBRCiyDN4xmN8aKhAY1AgCB4WHAlD0W+lKBmXASGFEICaQox6MzIEzAvsIxABNBkkZ/GACctMs2uCJFEl9lAOv6YClOTRy4ifbkyeHG+OHy/HGJLopZqsSL92MeOHVOdZHx9hwc1iZgLNPWAxQA5Ip1ARKHkIOs9Dg9ZMDvHLwCg7Xt5BXEZfOb+LS7hZGgzFi8pitGxwvI1ZtwnCQIcscvHMgojP1GUgGJGOIOYhZ//+gMPi3pi6IAaZeknYMcr5nQQ5wFsDBYFEhncINx8BgALGqsqCPWkqfIE2HpOkrcNmxH0yGj2XV4JrxsFh2Fe7MPV672eGNG6dw9SmmGzXIHEQJSYB4lpMZ2j8gAdGAW4tjfO/Gi7hx+jp8mXBpbxNXds9jWJaoG8NsGXBwGnCy6GCUMKK8N/7up2+9B4gSkjKSOkTVXgHWPvebOeibUNGZIMogJyBPgAdcXsJ1QOoU0rQwcaB8C7AC2qVhUv0Amx4x5LVMlkufj6oHXVFdSlYU83WJ/ZMMt/drHB+uMbYVbNQCWkIEiAlok6IVAbs+4rdmmLW9318/uY6AFS5tT3FuexNFVqLtGIenEXeOAo7nLVqNGAz0bMSmr8TVDKaKpH2hE4WQhCBCPSDmoNabbUYwKJQMIAXYgVgAJpADOEvgjIC2gXYtJAg8KnA5hI7Ui8jFmNp35do+zE7nnrP8nHG2FVKehbbEoi6wqluENkA5ACZQE8Sk6IKiDYI6E3AGsHOY1S1eO7yF149uYJ0W2NzIcW5rC2U+xGKVcDon3D4MODhusO7WyKuA4bAvccwAMUNSgaoiJkUQIAghpB6EpARRh6S9Owi4jxMwKOlbILizmOAN7AnEASoR2tXQGMDlJnhwDilEJ3F93qh+gtQFD+JNJT9KXHFyI4jLAc7hiOBYQKRQ6x+ui4IuCNpC4UTBpDhcnOKlW6/iYHEHZeWwOR0hy3LUHXB8EnHrjmH/IGK2qAFfY5onEOVn2++AiCFRf49iCOlsCSHqGRP0bkwgiPURoQ+aBpAAZP2AFlPf3XjAuIYlgbQLSDMHF1NwPgZVe0CYTc1OHxMB/PJ09UNyy644mm3J6IjDMgl1h62Ph5F1MUwxbCbJczU7C36MaIw6KUK3ws2TO3jj+HXUusDl8TaG1Rjr2rBcdbh1J+LmDcXxSUDSNYaTGgYGKO/fSwwx9caIWK/+JkNI6NWlxEjCvQiqfMYAOssMPQAKByM9C4wMOAfzBGQDWKqhYQlZHyAbTMCDXbhiApS7lcrxwzFQ5u/88Na/WRw3O8ul26XhqZvXw7q7dXpohy+mmN16shnSh+P28Bo7512eweU5KC/RiuBoPsed2R2s4gKuMGR5jiQei5Xg8Cjh5q2ImzcNq1WHYthgOO3eNF70DABRKAhy1/DY3+PZetMNjCDmeuobzlIxYNTDYOTO6gMGOQX5EuAETR2sPYbFTTgM4bIKlk8K6TbPQTT6/ddu/W4xWAxnx/U0q264KNk6LFaHcvK6pQne0yw2F4uT9fuO75xcQHK5hdylWKIVzq8f3K7unNzOjRLnRQ4Rh/lccHSYcOtWwp3bCYd3EpI28GUDdgFEvqd9MoSkYEdwih6AoD0A0RAjeiCEEJWRtI8X/ZbYWS1ydyiRFGADWEHMIG+grAL5CMQ1LC5A8RDOxoDPkfKBE7cxFrZtH7qwzz762HYZuGHRED21rTYH5Lf2viFJjo9uHH19cbC6fzi8tbN38Xh06b41pSI//9rxrUdP4ulVP6bC+wJtrWjWHQ4OEu7cNhztC5azDlleg9GCncFgZ9vhgijSV7bUMyBGRYiKGPt4kBRnq88GotRPjJ6lzb4ou1syA2DpY4ATkCtAroDFBtAEwgqOlyC/CfUeiQdeOQ19XhVSjgYymE6CG2whBG/mE9xw3/Lh5BhMJ/uv7X83NmmvHAx3T/eXo9n+nNMof+LI6qFt+ssbkw3T5Gm+jpidJOzfURzeJsyPFBIblPkKznUgclA1pKgISRFi6st8EEQUMRi6u79LhiDWxwLpQVAxqDJMATPuq1G4t9hAro8DbICLABcwymGU4FyAz1qISyBXAi534LLyKooUImLbmXENlQyaFCYRqWtMitxu/OD1eu/qxVvs3HGzrv1r33sBzdAxX55+YrS540VBbWtoFgknJ4T5qWF56tAsBXneoihqOCe9kCF6ttMjCFEAIzABJoqY7M8tRUo9C0TtzSLJzlwAdw0Hw+DOCiM96xvyN0dnDB6AgR2bz/sACjYwG8gZ++e+9s2/eE7w08/iymP3IcuKsH1hN1y9eAFf/Je/5/LHL8dBGmTJ4LpO0NURq1PG7NhjMXOoF0BsIgZli7xswR4QyZGi9vSPgs4LTAGG9cAEQwxAiOjdIBmS9G4gQtAzEFQZZtx3SXAg4zN582yzlAzgEsQBoBIES7np6RDtvHTLlHOdAh3NFcuTHzkoKUnAnhBDwvrWKb59tOLdR66N0qS6SFm+GZNR00RoCFgvc6xXDs06Q+oEpBHOd3B5ANj1wU8MSe6CkAC1Xk8SRYqGEAgx9ACkZBDBmzvBogxV6n3fCKYMMvpf9F3u23XOAM57NliosxCfn4T5t/2gWHZeV2vcuBNlPvuRAHz1i38MAHj2138Rp4VHXneOiUbs3Y4Sj2JSsjoitRnW6xz1ukDblkjSwjuDyxLYJ8AIkhQp3aV/Pw4jzuDMYGcbnjESYjxLg2JIZxuiKgSTvngy5TddoXeHuwxg4O4UO2cgl8FcCdO2Q71+KV/P/3A8GOyHTJbMJyetHDRve1i6a1oI57Cm6WXZxoNTNEtiJkKhNXSBEWOGlHKAozlWc04IpqSikGRIUZBiQsgEzNILnwaY9Lu/4cz4lNDTP/U9gSa8ZfSbINx1BT4znnrjyUDs0NfrGUScxDbOumV3fbR74TplZSCfRyWnbxuAerEENR5dG9REm6zkeVEPF9wlCGeQCGjqHyZjS47r/Ypmq5KabTZsq4JEFHLm/z70Vb067ZUgASQCIQBdPOsF4lvGq1BPf+0BUD0bkDDuq8u7cYCsb5XhAMpgroJq4UNQWp7O2uKNby+z4a596V//c7zvE7/59sflu1UNEMFEVENa2ih/I1u2L9Cou0zejzjF3EnQkuqOXHPCfPKtQo9v52H1uHX0U1b5DVVj0R6EFBMcM6AMNZwJGEBIhJjozTJYz2KAKZ3FAjvLCv04tBkBfy4o9nUCQ8nByINdZiycRJM19TK7+cM7vm5fj+/86Y+DtXv7AIS2AzHBl4U1p4uQ1cOX9Hj17+DLF31F20Q8QBvFx+Uqqh4oLV+G1nOZLb4Lxow8/0w+mlwwxxTJ4FRAIUKJwOiNTJEQIyOmvjCSaJAzFiQ5M1z6Mlq1F2bsTCtQc1A4CBEEHsoKcorKn67yNP++i4sfxLicUVwauSm61TG+87XPvX0AXNa/1JKCq9wQ9bYumhPk9dd9csPcWenDUvNgdYxSt4auM7Jutv6hT2Hmh6XRNH7EMr8hxFkkcmxGRgS2ns4pEWJyvd8nhYjrjU+EpNpXg2cqkZwFQAX1QBj181Jm6mCJWIR9XOd++f2cZ3/odf6nkPoI7X7iyoOy8ds/MAEAJweHODk4xPb5PaSYkJeFZoMy5sNB3V7eml37/g+O/8nn/v3xf3jsYwtKoUkJMaV1XNx4dZllOvNwR954hqAtA7lzPGDPnuisy9S+4ovxLADGPgBGAaL0ClFSB1EPsQxq/s0FMFgTnDRdruuj0uavjezkWwM9+kouJ5/nOP8qxdkrvHq5sfICAMEL3/nmvR+b++Tf/BUQM5wq3HgDWVGgOV0CBLz0yhFACygEmTW+LKtysLFxNdsafyDf2/iZbGPwjmxUXnTeDUHsVdklYY7Rs0QmCYyUmGLyFtUjaWYq3jR5M/Wq6hXmBEqJ1IIlWSKGIyfNzUKXr5Zy+jyn1feWa3mjXteN1Tdj1r6i6jfw4vPfuvdTYwDwxc/+Lj7z93/77HABENsOvsrxe7/zOwCAh9733r5aY0ouz1ZWdy9jMlzrun0l1N0F8Xw5q4oLnOU7IDclzoee8pKR5SyOSTyTiLGaZJKSCSIStRA0UFoTeMUic0iadVoctlYeE2TuEE5zNPsFr45XPAl0VzwB/787OPmR3/wlSN1RvjtlOOf1aFGxYaeYji74qrxAPt+mophSUQ2M80Is80k8p+RUBapigZJ0lGSNlNasNndECyfdMWJ7urLJySlfWollUsmJDeRInay0XZ1YXo7x1d/7F3+55wZ/7KvPWWZmwgyJt2ddvjVcIMp1ZMogZerDORH1giG9uQhsZv3XojAxBzVnUGdRyTorZaHJPWB8Nj2Ks86gPzpkf3WOzj7zd34ZPKqQ9mdwAIrpCL6qQFkOKgpQMYC5HKIeSTKIMEQIlhSUBJQSIAJWhQPBaQfEFmsdY87nwRA896/+8V8fiv7r621e/wM1SIV5o/rPtQAAAABJRU5ErkJggg==
// @run-at       document-idle
// @noframes
// @homepageURL  https://github.com/hughescr/userscripts/tree/main/bsky-unroller
// @supportURL   https://github.com/hughescr/userscripts/issues
// @downloadURL  https://raw.githubusercontent.com/hughescr/userscripts/main/bsky-unroller/bsky-unroller.user.js
// @updateURL    https://raw.githubusercontent.com/hughescr/userscripts/main/bsky-unroller/bsky-unroller.user.js
// @grant        none
// @license      Apache-2.0
// ==/UserScript==

/*
 * Bluesky Thread Unroller
 * =======================
 *
 * Adds a small, theme-matched "Unroll thread" link immediately to the LEFT of
 * the native Save (bookmark) button on every bsky.app post. It is a REAL anchor
 * (<a href>) pointing at the same post on https://tbsky.app, which renders the
 * whole thread unrolled. Because it is a genuine link, the browser handles clicks
 * natively:
 *   - Left-click       -> navigate to tbsky in the SAME tab.
 *   - Middle-click /
 *     Cmd-click        -> open tbsky in a new (background) tab.
 *   - Right-click      -> the native context menu ("Open Link in New Tab", etc.).
 * We deliberately set NO `target` attribute, so the browser's default per-click
 * behavior is preserved. The href is (re)computed from the live DOM just before
 * each activation (pointerdown/mousedown/focus) so it always points at THIS post.
 *
 * THE tbsky.app URL SCHEME (verified against a real post):
 *   tbsky.app's scheme is literally "prepend the letter 't' to any bsky.app URL".
 *   So  bsky.app/profile/<handle>/post/<rkey>
 *   ->  tbsky.app/profile/<handle>/post/<rkey>
 *   Verified live: https://tbsky.app/profile/jay.bsky.team/post/3mnzowafx4c2a -> HTTP 200.
 *   Because the host swap keeps the exact same path, we only ever need the
 *   canonical path "/profile/<handle>/post/<rkey>" and concatenate it onto
 *   "https://tbsky.app". This is NOT a coincidence -- it is tbsky's documented scheme.
 *
 * WHY THIS SCRIPT IS TIGHTLY COUPLED TO bsky's DOM:
 *   bsky.app is a react-native-web SPA. Its css-* / r-* atomic class names are
 *   NOT stable across builds, so we key off `data-testid` attributes ONLY (those
 *   ARE stable). Every selector below is derived from live-DOM recon. If bsky
 *   restructures these testids, the script simply no-ops -- it never throws and
 *   never breaks the page.
 *
 * CSP NOTE (verified 2026-06-15):
 *   bsky.app currently sends NO Content-Security-Policy header and NO CSP <meta>.
 *   So an injected <style> element and innerHTML SVG would both work today.
 *   For future-proofing (and lint cleanliness) we nonetheless:
 *     - build the SVG via createElementNS (not innerHTML), and
 *     - set the link's box styles via element.style.setProperty (JS-set inline
 *       styles are NOT subject to a future `style-src` directive).
 *   The one <style> element we inject for :hover WOULD break under a future
 *   `style-src` without 'unsafe-inline'; if that ever happens, move the hover
 *   highlight to JS pointerenter/pointerleave handlers. Documented here so the
 *   fix path is obvious.
 */

(() => {
    'use strict';

    // ---------------------------------------------------------------------------
    // Constants
    // ---------------------------------------------------------------------------

    // Where the unrolled thread lives. Host-swap target per the "prepend t" scheme.
    const TBSKY_ORIGIN = 'https://tbsky.app';

    // Class on OUR injected button -- used for hover styling + sibling detection.
    const BTN_CLASS = 'bsky-unroller-btn';

    // Informational marker we set on the native bookmark button once processed.
    // NOTE: this is NOT used as a query filter (that would defeat re-heal -- see
    // the scan() comments). It exists only as a debugging breadcrumb.
    const MARK_ATTR = 'data-bsky-unroller';

    // Stable anchor: the native Save/bookmark button. Everything keys off this.
    const BOOKMARK_SELECTOR = '[data-testid="postBookmarkBtn"]';

    // Fallback theme color (bsky light-theme bookmark icon = #667B99) used only if
    // we cannot read the sibling icon's computed color at insert time.
    const FALLBACK_THEME_COLOR = 'rgb(102, 123, 153)';

    // ---------------------------------------------------------------------------
    // One-time hover stylesheet
    // ---------------------------------------------------------------------------

    /**
     * Inject a tiny scoped stylesheet for OUR link only. bsky drives its own
     * hover via JS (no CSS :hover), so we add a subtle circular background
     * highlight that reads correctly on light/dim/dark themes (neutral grey-alpha,
     * not the theme color). Runs exactly once.
     *
     * Safari hardening: target (document.head || document.documentElement) and
     * null-guard, because under some early-injection models document.head may not
     * exist yet.
     */
    function injectStyles() {
        try {
            const root = document.head || document.documentElement;
            if (!root) {
                return;
            }
            // Idempotent: never inject the stylesheet twice.
            if (document.getElementById('bsky-unroller-style')) {
                return;
            }
            const style = document.createElement('style');
            style.id = 'bsky-unroller-style';
            style.textContent = [
                '.' + BTN_CLASS + ' { transition: background-color .12s ease; }',
                '.' + BTN_CLASS + ':hover { background-color: rgba(120,120,120,0.12) !important; }',
                '.' + BTN_CLASS + ':active { background-color: rgba(120,120,120,0.20) !important; }',
                '.' + BTN_CLASS + ':focus-visible { outline: 2px solid currentColor; outline-offset: 1px; }'
            ].join('\n');
            root.appendChild(style);
        } catch (e) {
            // Never throw out of init; a missing hover highlight is cosmetic.
        }
    }

    // ---------------------------------------------------------------------------
    // Canonical-URL helpers
    // ---------------------------------------------------------------------------

    /**
     * Strip a bsky post href down to its canonical path
     * "/profile/<handle>/post/<rkey>", discarding any trailing sub-route such as
     * /reposted-by, /quotes, /liked-by and any ?query / #hash. Returns null if the
     * string is not a post path.
     */
    function canon(path) {
        if (!path) {
            return null;
        }
        const m = path.match(/^(\/profile\/[^/]+\/post\/[^/?#]+)/);
        return m ? m[1] : null;
    }

    /**
     * Resolve an <a> element to a clean pathname.
     *
     * We deliberately use `new URL(a.href).pathname` rather than
     * a.getAttribute('href'):
     *   - a.href is always absolute-resolved by the DOM, so a raw .href would
     *     never match our ^-anchored /^\/profile/ regex.
     *   - .pathname gives the path with the origin stripped, which is exactly what
     *     canon() expects, and handles both relative ("/profile/...") and absolute
     *     ("https://bsky.app/profile/...") authored hrefs uniformly.
     *   - .pathname URL-encodes some characters, but bsky handles/rkeys are drawn
     *     from [a-zA-Z0-9._:-], none of which get encoded, so this is safe.
     */
    function pathOf(a) {
        try {
            return new URL(a.href).pathname;
        } catch (e) {
            return null;
        }
    }

    function canonicalPathFor(bookmarkBtn) {
        // Climb from the bookmark button outward. At the FIRST ancestor that contains a
        // qualifying post link appearing BEFORE the button in DOM order, return that
        // post's canonical path. This is deliberately CONTAINER-AGNOSTIC: it does NOT
        // depend on feedItem-by-/postThreadItem-by- wrappers, because some views (notably
        // SEARCH RESULTS under #searchScreen, and certain embeds) render posts without
        // any such testid'd container. Climbing stops at the post's own card before it
        // can reach sibling posts, and FIRST-MATCH-IN-DOM-ORDER selection guarantees we
        // pick THIS post's link, never an earlier sibling's.
        //
        // Verified live (2026-06-15): home feed + search results 253/253 resolved (P1);
        // a post thread 49/49 resolved (48 P1 + the FOCUSED post via P2), the focused
        // post correctly yielding its own canonical path (stat-link suffix stripped).
        let node = bookmarkBtn.parentElement;
        while (node && node !== document.body) {
            // Links in this subtree that appear BEFORE the bookmark button. The
            // timestamp / stat links live above the action bar; restricting to
            // "preceding" also drops the NEXT post if we ever climb past our own card.
            const links = [];
            for (const a of node.querySelectorAll('a[href*="/post/"]')) {
                if ((a.compareDocumentPosition(bookmarkBtn) & Node.DOCUMENT_POSITION_FOLLOWING) === 0) {
                    continue;
                }
                // Same-origin guard (defense-in-depth): so a non-bsky link that merely
                // looks like /profile/.../post/... can't be picked. The security review
                // confirmed the destination is already hardcoded to tbsky.app, so this
                // is robustness, not a vuln. On a malformed href, skip the anchor.
                try {
                    if (new URL(a.href).origin !== location.origin) {
                        continue;
                    }
                } catch (e) {
                    continue;
                }
                links.push(a);
            }

            // P1 -- TIMESTAMP link: canonical (raw === canon(raw), i.e. no /reposted-by
            // etc. sub-route) AND a non-null aria-label containing a Unicode decimal digit
            // (any locale's numerals -- the localized date, e.g. "June 15, 2026 at 9:34 AM").
            // A quoted embed's link has a null aria-label, so it is skipped here. We return
            // the FIRST match in DOM order: a quoted-embed post is a SIBLING subtree, never
            // an ancestor of the bookmark button, so at the first ancestor level that
            // contains any qualifying link (the outer post's own card), the OUTER post's
            // header timestamp always precedes any nested quoted-embed link in DOM order --
            // so first-match deterministically selects the outer post, even if a quoted
            // embed link ever gains a dated aria-label.
            for (const a of links) {
                const raw = pathOf(a);
                const c = canon(raw);
                if (c && raw === c) {
                    const label = a.getAttribute('aria-label');
                    if (label && /\p{Nd}/u.test(label)) {
                        return c;
                    }
                }
            }

            // P2 -- FOCUSED thread post: it has NO timestamp link, only stat links
            // (/post/<rkey>/reposted-by | /quotes | /liked-by). canon() strips the
            // suffix to recover the focused post's canonical path. First-match in DOM
            // order (harmless here since all stat links share one rkey).
            for (const a of links) {
                const raw = pathOf(a);
                if (raw && /\/post\/[^/]+\/(reposted-by|quotes|liked-by)/.test(raw)) {
                    const c = canon(raw);
                    if (c) {
                        return c;
                    }
                }
            }

            node = node.parentElement;
        }
        // Nothing resolvable -> caller no-ops (never opens a broken tab).
        return null;
    }

    // ---------------------------------------------------------------------------
    // Icon + link construction
    // ---------------------------------------------------------------------------

    const SVG_NS = 'http://www.w3.org/2000/svg';

    /**
     * Build the inline "unroll thread" icon as real SVG DOM (not innerHTML, for
     * CSP future-proofing). 18x18 in a 0 0 24 24 viewBox to sit inside the 28px
     * box with 5px padding, matching the native bookmark icon.
     *
     * Glyph: a stacked-list (three horizontal lines) with a downward chevron
     * beneath it -- reads as "expand / unroll the thread". Stroked with
     * currentColor so it inherits the theme color from the link.
     *
     * aria-hidden + focusable="false" so screen readers announce only the
     * link's aria-label, not the SVG.
     */
    function buildIcon() {
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('width', '18');
        svg.setAttribute('height', '18');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');

        // Three stacked list lines (the rolled-up thread).
        const lines = [
            ['4', '5', '20', '5'],
            ['4', '9', '20', '9'],
            ['4', '13', '14', '13']
        ];
        for (const [x1, y1, x2, y2] of lines) {
            const line = document.createElementNS(SVG_NS, 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            svg.appendChild(line);
        }

        // Downward chevron (the "unroll / expand" motion).
        const chevron = document.createElementNS(SVG_NS, 'polyline');
        chevron.setAttribute('points', '8 16 12 20 16 16');
        svg.appendChild(chevron);

        return svg;
    }

    /**
     * Build the <a>. A REAL anchor lets the browser handle clicks natively:
     * left-click navigates in the SAME tab, middle-click / Cmd-click open a new
     * (background) tab, and right-click yields the native "Open Link in New Tab"
     * context menu. We deliberately set NO `target` attribute so the browser's
     * per-click default is preserved (a `target="_blank"` would force a new tab on
     * every click, which we do NOT want). `rel="noopener noreferrer"` hardens any
     * new-tab open against reverse-tabnabbing / referrer leakage.
     *
     * Box styles are set via style.setProperty (JS-set inline styles dodge any
     * future `style-src` CSP) to mirror the native bookmark button exactly.
     * 'text-decoration':'none' suppresses the default anchor underline.
     */
    function buildLink(themeColor) {
        const link = document.createElement('a');
        link.className = BTN_CLASS;
        link.setAttribute('aria-label', 'Unroll thread on tbsky.app');
        link.title = 'Unroll thread on tbsky.app';
        // No target => left-click stays in this tab; middle/Cmd-click natively
        // open a new tab. noopener/noreferrer harden any new-tab open.
        link.setAttribute('rel', 'noopener noreferrer');

        // Mirror the native bookmark button's 28x28 circular transparent box.
        // (28px deliberately matches native bsky; it is below the 44x44 WCAG
        // touch-target guideline, but visual consistency with the native control
        // wins here -- the native Save button is also 28px.)
        const box = {
            'width': '28px',
            'height': '28px',
            'padding': '5px',
            'border-radius': '999px',
            'display': 'inline-flex',
            'flex-direction': 'row',
            'justify-content': 'center',
            'align-items': 'center',
            'gap': '4px',
            'background-color': 'rgba(0,0,0,0)',
            'background-image': 'none',
            'border': '0',
            'outline': '0',
            'margin': '0',
            'cursor': 'pointer',
            'box-sizing': 'border-box',
            // Anchors underline by default; suppress it.
            'text-decoration': 'none',
            // currentColor source for the SVG; theme-matched at insert time.
            'color': themeColor || FALLBACK_THEME_COLOR
        };
        for (const prop in box) {
            if (Object.prototype.hasOwnProperty.call(box, prop)) {
                link.style.setProperty(prop, box[prop]);
            }
        }

        link.appendChild(buildIcon());
        return link;
    }

    // ---------------------------------------------------------------------------
    // Injection + re-heal
    // ---------------------------------------------------------------------------

    /**
     * Read the live theme color from a native bookmark button's icon. bsky sets
     * the Save <svg>'s color as an INLINE style (e.g. rgb(102,123,153) in light)
     * and updates it on theme change, so its computed `color` is the source of
     * truth for the current light/dim/dark icon color. Returns FALLBACK_THEME_COLOR
     * if the button or its svg can't be read. Never throws.
     */
    function readThemeColor(bookmarkBtn) {
        try {
            const sibSvg = bookmarkBtn && bookmarkBtn.querySelector
                ? bookmarkBtn.querySelector('svg')
                : null;
            return sibSvg
                ? getComputedStyle(sibSvg).color
                : FALLBACK_THEME_COLOR;
        } catch (e) {
            return FALLBACK_THEME_COLOR;
        }
    }

    /**
     * Process a single native bookmark button: insert our link immediately
     * before it (joining the right-hand action group and inheriting its 8px gap),
     * unless our link is already present.
     *
     * Idempotency / re-heal: React may re-render the action bar and DROP our
     * injected sibling while keeping the bookmark button. So we never trust a
     * marker alone -- we check whether our sibling actually still exists:
     *   - PRIMARY O(1) check: previousElementSibling is our link (we always
     *     insert immediately before the bookmark button). This keys off BTN_CLASS,
     *     which is set on the <a>, so it recognizes our element fine.
     *   - FALLBACK: a scoped query of the parent for our class (covers the rare
     *     case where React reordered siblings).
     * If our link is gone, we (re)insert it. This makes MARK_ATTR purely
     * informational, never a correctness dependency.
     */
    function processBookmarkButton(bookmarkBtn) {
        try {
            if (!bookmarkBtn || !bookmarkBtn.isConnected) {
                return;
            }

            // O(1) already-present check: our link is always the immediate
            // previous sibling when present.
            const prev = bookmarkBtn.previousElementSibling;
            if (prev && prev.classList && prev.classList.contains(BTN_CLASS)) {
                bookmarkBtn.setAttribute(MARK_ATTR, '1');
                return;
            }

            // Fallback presence check (handles a sibling reorder).
            const parent = bookmarkBtn.parentElement;
            if (parent && parent.querySelector(':scope > .' + BTN_CLASS)) {
                bookmarkBtn.setAttribute(MARK_ATTR, '1');
                return;
            }

            // Read the theme color from the sibling bookmark icon at insert time
            // so our icon matches light/dim/dark, then bake it into our link's
            // inline color. This is an initial snapshot; two mechanisms keep it
            // fresh thereafter: (1) a childList re-heal re-runs this whole path and
            // re-reads the color, and (2) a dedicated theme observer (see
            // installThemeObserver / recolorAllLinks) re-mirrors EVERY injected
            // link the instant the user switches light/dim/dark -- even when bsky
            // recolors the existing Save icon via inline styles WITHOUT recreating
            // any nodes (which would never fire the childList re-heal). So the
            // earlier "stale until next action-bar re-render" limitation no longer
            // applies: a pure theme swap now recolors us immediately.
            const themeColor = readThemeColor(bookmarkBtn);

            const link = buildLink(themeColor);

            // Recompute the href from the LIVE DOM and stamp it on the anchor.
            // canonicalPathFor() reflects the current post under this button, so
            // resolving it just before activation keeps the link correct even
            // after React re-renders / SPA navigation. A transient null must
            // NEVER blank a previously-good href, so on null we leave href as-is.
            function refreshHref() {
                try {
                    // Re-anchor to a LIVE button: React may replace the bookmark node,
                    // detaching our captured reference. If so, the live bookmark button
                    // is our link's nextElementSibling (we always insert immediately
                    // before it), so resolve from that instead of the stale node.
                    let btn = bookmarkBtn;
                    if (!btn.isConnected) {
                        const sib = link.nextElementSibling;
                        if (sib && sib.matches && sib.matches(BOOKMARK_SELECTOR)) {
                            btn = sib;
                        }
                    }
                    const path = canonicalPathFor(btn);
                    if (path) {
                        link.href = TBSKY_ORIGIN + path;
                    }
                    // path === null -> keep the existing href untouched.
                } catch (e) {
                    // Never throw -- keep whatever href we already had.
                }
            }

            // Set the initial href immediately.
            refreshHref();

            // Two handler shapes, both of which NEVER call preventDefault (that
            // would cancel the browser's native navigation / new-tab behavior --
            // the whole point of using a real anchor):
            //   - stopOnly        : just stopPropagation, so bsky's post-card
            //                       click handlers can't hijack the interaction.
            //   - refreshAndStop  : refresh the href from the live DOM FIRST
            //                       (the press fires before navigation, so this
            //                       guarantees we navigate to THIS post), then
            //                       stopPropagation.
            const stopOnly = function (ev) {
                ev.stopPropagation();
            };
            const refreshAndStop = function (ev) {
                refreshHref();
                ev.stopPropagation();
            };

            // Press-phase events fire BEFORE the click/navigation: refresh + stop.
            // (One combined handler per event -- no duplicate listeners.)
            link.addEventListener('pointerdown', refreshAndStop);
            link.addEventListener('mousedown', refreshAndStop);
            // Keyboard activation focuses first; capture so we refresh early.
            link.addEventListener('focus', refreshHref, true);
            // click + auxclick (middle-click): stop bsky from hijacking, but let
            // the browser perform its native navigation / new-tab open.
            link.addEventListener('click', stopOnly);
            link.addEventListener('auxclick', stopOnly);

            // Insert just to the LEFT of Save (joins the right action group).
            bookmarkBtn.before(link);
            bookmarkBtn.setAttribute(MARK_ATTR, '1');
        } catch (e) {
            // Never throw -- the observer will retry on the next mutation.
        }
    }

    /**
     * Scan the whole document for native bookmark buttons and (re)process each.
     *
     * IMPORTANT: we scan ALL [data-testid="postBookmarkBtn"] -- we do NOT filter
     * by the marker attribute. Filtering by ":not([data-bsky-unroller])" would
     * defeat re-heal: a button React kept (marked) but whose sibling React dropped
     * would be skipped forever. processBookmarkButton() decides per-button via the
     * sibling-presence check, so re-running over everything is correct and cheap
     * (the present-button path is O(1) and inserts nothing).
     *
     * SELF-TRIGGER NOTE: our own bookmarkBtn.before(btn) is a childList mutation,
     * which re-fires the observer and schedules one more scan. That follow-up scan
     * finds our sibling already present and inserts nothing -> no new mutation ->
     * the loop terminates. It is self-limiting, NOT infinite.
     */
    function scan() {
        const buttons = document.querySelectorAll(BOOKMARK_SELECTOR);
        for (const bm of buttons) {
            processBookmarkButton(bm);
        }
    }

    // rAF-coalesced debounce: collapse the burst of mutations from a single feed
    // render into one scan, run after layout, and self-throttle in background tabs
    // (rAF is paused when the tab is hidden -- acceptable: hidden tabs need no
    // visible buttons; they appear on refocus).
    let scanScheduled = false;
    function scheduleScan() {
        if (scanScheduled) {
            return;
        }
        scanScheduled = true;
        requestAnimationFrame(() => {
            scanScheduled = false;
            try {
                scan();
            } catch (e) {
                // swallow -- observer will fire again on the next mutation
            }
        });
    }

    // ---------------------------------------------------------------------------
    // Theme observer -- keep our icon color in sync with light/dim/dark switches
    // ---------------------------------------------------------------------------

    /**
     * Re-mirror the live Save-icon color onto EVERY injected link. bsky updates
     * the native Save <svg>'s inline color on a theme switch without necessarily
     * re-rendering the action bar (so the childList re-heal would miss it); this
     * re-reads each link's CURRENT sibling Save color and restamps it.
     *
     * For each link we locate its LIVE Save button: prefer nextElementSibling (we
     * always insert immediately before Save), else fall back to a parent query.
     * Everything is guarded; a link whose Save button/svg can't be found is simply
     * skipped, and we never throw.
     */
    function recolorAllLinks() {
        try {
            const links = document.querySelectorAll('.' + BTN_CLASS);
            for (const link of links) {
                try {
                    let btn = link.nextElementSibling;
                    if (!(btn && btn.matches && btn.matches(BOOKMARK_SELECTOR))) {
                        btn = link.parentElement
                            ? link.parentElement.querySelector(BOOKMARK_SELECTOR)
                            : null;
                    }
                    if (!btn) {
                        continue;
                    }
                    const svg = btn.querySelector('svg');
                    if (!svg) {
                        continue;
                    }
                    const color = getComputedStyle(svg).color;
                    link.style.setProperty('color', color);
                } catch (e) {
                    // Skip this one link; keep recoloring the rest.
                }
            }
        } catch (e) {
            // Never throw out of the theme observer.
        }
    }

    // rAF-coalesced debounce mirroring scheduleScan(): collapse a burst of <html>
    // class mutations into one recolor. Run on rAF so bsky's re-render has applied
    // the new inline Save-icon colors BEFORE we read them (reading synchronously in
    // the same tick could snapshot the OLD color).
    let recolorScheduled = false;
    function scheduleRecolor() {
        if (recolorScheduled) {
            return;
        }
        recolorScheduled = true;
        requestAnimationFrame(() => {
            recolorScheduled = false;
            try {
                recolorAllLinks();
            } catch (e) {
                // swallow -- the observer will fire again on the next class change
            }
        });
    }

    /**
     * Watch <html> for class changes and recolor on each. bsky applies its theme
     * as a class on document.documentElement (theme--light / theme--dark /
     * theme--dim); we react to ANY class change rather than hardcoding those values,
     * so this stays robust even if bsky renames its theme-- classes. Cheap: it fires
     * only on <html> class mutations, not on the whole subtree.
     */
    function installThemeObserver() {
        try {
            const observer = new MutationObserver(scheduleRecolor);
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
        } catch (e) {
            // Without the theme observer our icons still recolor on the next
            // childList re-heal; the page remains fully functional.
        }
    }

    // ---------------------------------------------------------------------------
    // Bootstrap
    // ---------------------------------------------------------------------------

    function init() {
        // Double-init guard. @grant none shares the page's window, so we avoid a
        // window global (page-script collision risk) and use a dataset flag on
        // <html> instead. If init somehow runs twice (loader quirk), the second
        // run no-ops -- preventing duplicate observers / double scans. Uses a
        // dedicated key (data-bsky-unroller-init) so it never collides with
        // MARK_ATTR (data-bsky-unroller), the per-button breadcrumb.
        try {
            if (document.documentElement.dataset.bskyUnrollerInit) {
                return;
            }
            document.documentElement.dataset.bskyUnrollerInit = '1';
        } catch (e) {
            // If we can't set the flag, proceed once anyway.
        }

        injectStyles();
        scan();

        // One observer on the whole document subtree. We watch childList only
        // (NOT attributes) -- like/bookmark toggles are attribute changes and
        // would be pure noise. React adding/removing action-bar subtrees and SPA
        // route changes are childList mutations we catch here.
        try {
            const observer = new MutationObserver(scheduleScan);
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        } catch (e) {
            // Without an observer we still injected once on initial scan; the page
            // remains fully functional, just no late re-heal.
        }

        // Keep our icon color in sync when the user switches light/dim/dark.
        installThemeObserver();
    }

    // @run-at document-idle usually means the DOM is ready, but guard for both
    // loaders/timings to be safe.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
