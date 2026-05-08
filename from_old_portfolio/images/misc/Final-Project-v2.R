## ----include=FALSE------------------------------------------------------------
# Reading in the dataset 

install.packages("rcompanion") 

install.packages("tidyverse")
library(tidyverse)
library(dplyr)
 
library(rcompanion)

midterm=read.csv('302data.csv', header=TRUE)
attach(midterm)


## ----include=FALSE------------------------------------------------------------
## Creating new columns 

# summing all the hours spent thinking about covid in the first three weeks  
midterm$covid_total = rowSums(midterm[,c("COVID", "COVID2", "COVID3", "COVID4")])

#summing hours spent studying in the first 3 weeks 
midterm$study_total = rowSums(midterm[,c("Studying", "Studying2", "Studying3", "Studying4")])

# summing hours spent on miscellaneous activities
midterm$misc_total = rowSums(midterm[,c("Miscellaneous", "Miscellaneous2", "Miscellaneous3", "Misceallenous4")])


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
study1_mean <- mean(midterm$Studying)
study1_med <- median(midterm$Studying)
                   
ggplot(midterm, aes(x=Studying))+geom_histogram(fill='pink', color='black', bins=20) + 
  ggtitle("Hours spent studying (Week 1)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = study1_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = study1_mean, color = "red") +
  labs(x = "Hours spent on studying", y = "Students" ) +
  annotate("text",                       
           x = study1_mean * 1.5,
           y = study1_mean * 5,
           label = paste("Mean =", study1_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = study1_med * 0.4,
           y = study1_med * 7,
           label = paste("Median =", study1_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
study2_mean <- mean(midterm$Studying2)
study2_med <- median(midterm$Studying2)
                   
ggplot(midterm, aes(x=Studying2))+geom_histogram(fill='pink', color='black', bins=20) + 
  ggtitle("Hours spent studying (Week 2)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = study2_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = study2_mean, color = "red") + 
  labs(x = "Hours spent on studying", y = "Students") +
  annotate("text",                       
           x = study2_mean * 1.5,
           y = study2_mean * 4,
           label = paste("Mean =", study2_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = study2_med * 0.7,
           y = study2_med * 5,
           label = paste("Median =", study2_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
study3_mean <- mean(midterm$Studying3)
study3_med <- median(midterm$Studying3)
                   
ggplot(midterm, aes(x=Studying3))+geom_histogram(fill='pink', color='black', bins=20) + 
  ggtitle("Hours spent studying (Week 3)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = study3_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = study3_mean, color = "red") + 
  labs(x = "Hours spent on studying", y = "Students") +

  annotate("text",                       
           x = study3_mean * 1.5,
           y = study3_mean * 4,
           label = paste("Mean =", study3_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = study3_med * 0.7,
           y = study3_med * 5,
           label = paste("Median =", study3_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
study4_mean <- mean(midterm$Studying4)
study4_med <- median(midterm$Studying4)
                   
ggplot(midterm, aes(x=Studying4))+geom_histogram(fill='pink', color='black', bins=20) + 
  ggtitle("Hours spent studying (Week 4)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = study4_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = study4_mean, color = "red") + 
  labs(x = "Hours spent on studying", y = "Students") +
  annotate("text",                       
           x = study4_mean * 1.6,
           y = study4_mean * 4,
           label = paste("Mean =", study4_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = study4_med * 0.65,
           y = study4_med * 5,
           label = paste("Median =", study4_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
covid1_mean <- mean(midterm$COVID)
covid1_med <- median(midterm$COVID)
                   
ggplot(midterm, aes(x=COVID))+geom_histogram(fill='green', color='black', bins=20) + 
  ggtitle("Hours spent thinking about COVID (Week 1)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = covid1_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = covid1_mean, color = "red") +
  labs(x = "Hours spent thinking about COVID", y = "Students") +
  annotate("text",                       
           x = covid1_mean * 2.2,
           y = covid1_mean * 20,
           label = paste("Mean =", covid1_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = covid1_med * 0.1,
           y = covid1_med * 26,
           label = paste("Median =", covid1_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
covid2_mean <- mean(midterm$COVID2)
covid2_med <- median(midterm$COVID2)
                   
ggplot(midterm, aes(x=COVID2))+geom_histogram(fill='green', color='black', bins=20) + 
  ggtitle("Hours spent thinking about COVID (Week 2)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = covid2_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = covid2_mean, color = "red") +
  labs(x = "Hours spent thinking about COVID", y = "Students") +
  annotate("text",                       
           x = covid2_mean * 3,
           y = covid2_mean * 20,
           label = paste("Mean =", covid2_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = covid2_med * 6,
           y = covid2_med * 60,
           label = paste("Median =", covid2_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
covid3_mean <- mean(midterm$COVID3)
covid3_med <- median(midterm$COVID3)
                   
ggplot(midterm, aes(x=COVID3))+geom_histogram(fill='green', color='black', bins=20) + 
  ggtitle("Hours spent thinking about COVID (Week 3)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = covid3_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = covid3_mean, color = "red") +
  labs(x = "Hours spent thinking about COVID", y = "Students") +
  annotate("text",                       
           x = covid3_mean * 2.3,
           y = covid3_mean * 20,
           label = paste("Mean =", covid3_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = covid3_med * 0.1,
           y = covid3_med * 40,
           label = paste("Median =", covid3_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
covid4_mean <- mean(midterm$COVID4)
covid4_med <- median(midterm$COVID4)
                   
ggplot(midterm, aes(x=COVID4))+geom_histogram(fill='green', color='black', bins=20) + 
  ggtitle("Hours spent thinking about COVID (Week 4)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = covid4_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = covid4_mean, color = "red") +
  labs(x = "Hours spent thinking about COVID", y = "Students") +
  annotate("text",                       
           x = covid4_mean * 4,
           y = covid4_mean * 40,
           label = paste("Mean =", covid4_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = covid4_med * 4,
           y = covid4_med * 75,
           label = paste("Median =", covid4_med),
           col = "blue",
           size = 4)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
misc_mean <- mean(midterm$Miscellaneous)
misc_med <- median(midterm$Miscellaneous)
                   
ggplot(midterm, aes(x=Miscellaneous))+geom_histogram(fill='yellow', color='black', bins=20) + 
  ggtitle("Hours spent on Miscellaneous activities (Week 1)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = misc_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = misc_mean, color = "red") +
  labs(x = "Hours spent on Miscellaneous activities", y = "Students") +
  annotate("text",                       
           x = misc_mean * 1.5,
           y = misc_mean * 1.3,
           label = paste("Mean =", misc_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = misc_med * 0.5,
           y = misc_med * 2,
           label = paste("Median =", misc_med),
           col = "blue",
           size = 4) + 
    ylim(0, 30)



## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
misc2_mean <- mean(midterm$Miscellaneous2)
misc2_med <- median(midterm$Miscellaneous2)
                   
ggplot(midterm, aes(x=Miscellaneous2))+geom_histogram(fill='yellow', color='black', bins=20) + 
  ggtitle("Hours spent on Miscellaneous activities (Week 2)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = misc2_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = misc2_mean, color = "red") +
  labs(x = "Hours spent on Miscellaneous activities", y = "Students") +
  annotate("text",                       
           x = misc2_mean * 1.9,
           y = misc2_mean * 0.7,
           label = paste("Mean =", misc2_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = misc2_med * 0.7,
           y = misc2_med * 1.3,
           label = paste("Median =", misc2_med),
           col = "blue",
           size = 4) +
  ylim(0, 30)


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
misc3_mean <- mean(midterm$Miscellaneous3)
misc3_med <- median(midterm$Miscellaneous3)
                   
ggplot(midterm, aes(x=Miscellaneous3))+geom_histogram(fill='yellow', color='black', bins=20) + 
  ggtitle("Hours spent on Miscellaneous activities (Week 3)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = misc3_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = misc3_mean, color = "red") +
  labs(x = "Hours spent on Miscellaneous activities", y = "Students") +
  annotate("text",                       
           x = misc3_mean * 1.6,
           y = misc3_mean * 0.8,
           label = paste("Mean =", misc3_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = misc3_med * 0.5,
           y = misc3_med * 1.3,
           label = paste("Median =", misc3_med),
           col = "blue",
           size = 4) +
  ylim(0, 30)


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
misc4_mean <- mean(midterm$Misceallenous4)
misc4_med <- median(midterm$Misceallenous4)
                   
ggplot(midterm, aes(x=Misceallenous4))+geom_histogram(fill='yellow', color='black', bins=20) + 
  ggtitle("Hours spent on Miscellaneous activities (Week 4)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  geom_vline(xintercept = misc4_med, color = "blue", linetype = "dashed") +
  geom_vline(xintercept = misc4_mean, color = "red") +
  labs(x = "Hours spent on Miscellaneous activities", y = "Students") +
  annotate("text",                       
           x = misc4_mean * 1.8,
           y = misc4_mean * 0.8,
           label = paste("Mean =", misc4_mean),
           col = "red",
           size = 4) + 
  annotate("text",                       
           x = misc4_med * 0.5,
           y = misc4_med * 1.3,
           label = paste("Median =", misc4_med),
           col = "blue",
           size = 4) +
  ylim(0, 30)



## ----echo=FALSE, fig.align="center", fig.height=4, fig.width=8, message=FALSE, warning=FALSE----

study1 <- select(midterm, Studying)
study2 <- select(midterm, Studying2)
study3 <- select(midterm, Studying3)
study4 <- select(midterm, Studying4)
study<-data.frame(study1, study2, study3, study4)
study<- data.frame(Studying = unlist(study))

study["group"]<- ""

study$group[1:110] <- "Studying"
study$group[111:220] <- "Studying2"
study$group[221:330] <- "Studying3"
study$group[331:440] <- "Studying4"


b_study <- ggplot(study, aes(x=group, y = Studying, color=group)) +
  geom_violin() +
  geom_boxplot(width=0.1) + 
  geom_smooth(method = "lm", se=FALSE, color="black", aes(group=1))

b_study



## ----echo=FALSE, fig.align="center", fig.height=4, fig.width=8, message=FALSE, warning=FALSE----
# Three extreme data values (20,40, 60hrs)
STUDY_filtered <- subset(study, Studying<60 )
b_study <- ggplot(STUDY_filtered, aes(x=group, y = Studying, color=group)) +
  geom_violin() +
  geom_boxplot(width=0.1)+ 
  geom_smooth(method = "lm", se=FALSE, color="black", aes(group=1))
b_study


## ----echo=FALSE, fig.align="center", fig.height=4, fig.width=8, message=FALSE, warning=FALSE----

cov1 <- select(midterm, COVID)
cov2 <- select(midterm, COVID2)
cov3 <- select(midterm, COVID3)
cov4 <- select(midterm, COVID4)
cov<-data.frame(cov1, cov2, cov3, cov4)
cov<- data.frame(cov = unlist(cov))

cov["group"]<- ""

cov$group[1:110] <- "COVID"
cov$group[111:220] <- "COVID2"
cov$group[221:330] <- "COVID3"
cov$group[331:440] <- "COVID4"

b_COVID <- ggplot(cov, aes(x=group, y = cov, color=group)) +
  geom_violin() +
  geom_boxplot(width=0.1)+ 
  geom_smooth(method = "lm", se=FALSE, color="black", aes(group=1))
b_COVID



## ----echo=FALSE, fig.height=4, fig.width=8, fig.align = "center", message=FALSE, warning=FALSE----
# Three extreme data values (20,40, 60hrs)
COVID_filtered <- subset(cov, cov<20 )
b_COVID <- ggplot(COVID_filtered, aes(x=group, y = cov, color=group)) +
  geom_violin() +
  geom_boxplot(width=0.1) + 
  geom_smooth(method = "lm", se=FALSE, color="black", aes(group=1))
b_COVID


## ----echo=FALSE, fig.align="center", fig.height=4, fig.width=8, message=FALSE, warning=FALSE----

MISC1 <- select(midterm, Miscellaneous)
MISC2 <- select(midterm, Miscellaneous2)
MISC3 <- select(midterm, Miscellaneous3)
MISC4 <- select(midterm, Misceallenous4)
MISC<-data.frame(MISC1, MISC2, MISC3, MISC4)
MISC<- data.frame(MISC = unlist(MISC))

MISC["group"]<- ""

MISC$group[1:110] <- "MISC"
MISC$group[111:220] <- "MISC2"
MISC$group[221:330] <- "MISC3"
MISC$group[331:440] <- "MISC4"

b_MISC <- ggplot(MISC, aes(x=group, y = MISC, color=group)) +
  geom_violin() +
  geom_boxplot(width=0.1)+ 
  geom_smooth(method = "lm", se=FALSE, color="black", aes(group=1))
b_MISC



## ----echo=FALSE, fig.align="center", fig.height=4, fig.width=8, message=FALSE, warning=FALSE----
# Three extreme data values (20,40, 60hrs)
MISC_filtered <- subset(MISC, MISC<150 )
b_MISC <- ggplot(MISC_filtered, aes(x=group, y = MISC, color=group)) +
  geom_violin() +
  geom_boxplot(width=0.1) + 
  geom_smooth(method = "lm", se=FALSE, color="black", aes(group=1))
b_MISC


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=study_total, y=covid_total, color=OH)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=study_total, y=misc_total, color=OH)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=misc_total, y=covid_total, color=OH)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=study_total, y=covid_total, color=Famiiliar)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=study_total, y=misc_total, color=Famiiliar)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=misc_total, y=covid_total, color=Famiiliar)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying, y=Term.Test, color=OH)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying2, y=Term.Test, color=OH)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying3, y=Term.Test, color=OH)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying4,y=Term.Test, color=OH)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying, y=Term.Test, color=Famiiliar)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying2, y=Term.Test, color=Famiiliar)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying3, y=Term.Test, color=Famiiliar)) + geom_point()


## ----echo=FALSE, fig.height=2.2, fig.width=8, fig.align = "center"------------
ggplot(data=midterm,aes(x=Studying4,y=Term.Test, color=Famiiliar)) + geom_point()


## ----echo=FALSE, fig.align = "center"-----------------------------------------

pairs(~Term.Test+Studying+Studying2+Studying3+Studying4)


## ----echo=FALSE, fig.align = "center"-----------------------------------------
pairs(~Term.Test+Miscellaneous+Miscellaneous2+Miscellaneous3+Misceallenous4)


## ----echo=FALSE, fig.align = "center"-----------------------------------------
pairs(~Term.Test+COVID+COVID2+COVID3+COVID4)


## ----echo=FALSE, fig.align = "center"-----------------------------------------
pairs(~Term.Test+COVID+Studying+Miscellaneous)


## ----echo=FALSE, fig.align = "center"-----------------------------------------
pairs(~Term.Test+COVID2+Studying2+Miscellaneous2)


## ----echo=FALSE, fig.align = "center"-----------------------------------------
pairs(~Term.Test+COVID3+Studying3+Miscellaneous3)


## ----echo=FALSE, fig.align = "center"-----------------------------------------
pairs(~Term.Test+COVID4+Studying4+Misceallenous4)


## ----include=FALSE, code = readLines(knitr::purl("Final-Project-v2.Rmd", documentation = 1)), echo = T, eval = F----
## ## mutate for categorical variables
## midterm = midterm %>% mutate(fam_strong_agree = ifelse(Famiiliar=="Strongly Agree",1,0))
## midterm = midterm %>% mutate(fam_strong_disagree = ifelse(Famiiliar=="Strong Disagree",1,0))
## midterm = midterm %>% mutate(fam_agree = ifelse(Famiiliar=="Agree",1,0))
## midterm = midterm %>% mutate(fam_disagree = ifelse(Famiiliar=="Disagree",1,0))
## midterm = midterm %>% mutate(fam_neutral = ifelse(Famiiliar=="Neutral",1,0))
## 
## midterm = midterm %>% mutate(oh_never = ifelse(OH=="Never",1,0))
## midterm = midterm %>% mutate(oh_less = ifelse(OH=="Less than one time a week (on average)",1,0))
## midterm = midterm %>% mutate(oh_once = ifelse(OH=="Once a week",1,0))
## midterm = midterm %>% mutate(oh_alo = ifelse(OH=="At least once a week",1,0))
## 
## midterm_quant = midterm %>% select("Studying", "Studying2", "Studying3", "Studying4", "Miscellaneous", "Miscellaneous2" ,"Miscellaneous3", "Misceallenous4", "COVID", "COVID2", "COVID3", "COVID4", "Term.Test")
## 
## 


## ----include=FALSE, code = readLines(knitr::purl("Final-Project-v2.Rmd", documentation = 1)), echo = T, eval = F----
## midterm_quant = midterm %>% select("study_total", "misc_total", "covid_total", "Term.Test")
## 
## cov(midterm_quant)
## cor(midterm_quant)
## 


## ----include=FALSE------------------------------------------------------------

## backwards from interaction terms original chart (before backwards)

## backwards from interaction terms original chart (before backwards)
poly.fit = lm(Term.Test~Studying+Studying2+Studying3+Studying4
              +Miscellaneous+Miscellaneous2+Miscellaneous3+Misceallenous4
              +I(Studying*Studying3)
              +I(Studying*Studying4)+I(Studying*Studying2)+I(Studying2*Studying3)
              +I(Studying3*Studying4)+I(Studying2*Studying4)
              
              +I(Miscellaneous*Miscellaneous2)
              +I(Miscellaneous2*Miscellaneous3)+I(Miscellaneous3*Misceallenous4)
              +I(Miscellaneous2*Misceallenous4)+I(Miscellaneous*Misceallenous4)
              +I(Miscellaneous*Miscellaneous3)
              
              +I(Miscellaneous**2)
              +I(Miscellaneous2**2)
              +I(Miscellaneous3**2)
              +I(Misceallenous4**2)
              
              +I(Studying**2)
              +I(Studying2**2)
              +I(Studying3**2)
              +I(Studying4**2)
              
              
              +I(Studying*Miscellaneous)+I(Studying*Miscellaneous2)+I(Studying*Miscellaneous3)
              +I(Studying*Misceallenous4)
              
              +I(Studying2*Miscellaneous)+I(Studying2*Miscellaneous2)+I(Studying2*Miscellaneous3)+
              I(Studying2*Misceallenous4)
              
              +I(Studying3*Miscellaneous)+I(Studying3*Miscellaneous2)+I(Studying3*Miscellaneous3)
              +I(Studying3*Misceallenous4)
              
              +I(Studying4*Miscellaneous)+I(Studying4*Miscellaneous2)+I(Studying4*Miscellaneous3)+
                I(Studying4*Misceallenous4)
              
              , data=midterm)
summary(poly.fit)


## ----include=FALSE------------------------------------------------------------

poly.fit = lm(Term.Test~Studying+Studying2+Studying3+Studying4
              +Miscellaneous+Miscellaneous2+Miscellaneous3+Misceallenous4
              +I(Studying*Studying3)
              +I(Studying*Studying4)+I(Studying*Studying2)+I(Studying2*Studying3)
              +I(Studying3*Studying4)+I(Studying2*Studying4)
              
              +I(Miscellaneous*Miscellaneous2)
              +I(Miscellaneous2*Miscellaneous3)+I(Miscellaneous3*Misceallenous4)
              +I(Miscellaneous2*Misceallenous4)+I(Miscellaneous*Misceallenous4)
              +I(Miscellaneous*Miscellaneous3)
              +I(Miscellaneous2**2)
              +I(Miscellaneous3**2)
              +I(Misceallenous4**2)
              
              +I(Studying**2)
              +I(Studying2**2)
              +I(Studying3**2)
              +I(Studying4**2)
              
              
              +I(Studying*Miscellaneous)+I(Studying*Miscellaneous2)+I(Studying*Miscellaneous3)
              +I(Studying*Misceallenous4)
              
              +I(Studying2*Miscellaneous)+I(Studying2*Miscellaneous2)+I(Studying2*Miscellaneous3)+
              I(Studying2*Misceallenous4)
              
              +I(Studying3*Miscellaneous)+I(Studying3*Miscellaneous2)+I(Studying3*Miscellaneous3)
              +I(Studying3*Misceallenous4)
              
              +I(Studying4*Miscellaneous)+I(Studying4*Miscellaneous2)+I(Studying4*Miscellaneous3)+
                I(Studying4*Misceallenous4)
              
              , data=midterm)
summary(poly.fit)


## ----include=FALSE------------------------------------------------------------

## backwards from interaction terms original chart (before backwards)
final_model = lm(Term.Test~Studying4
              +Miscellaneous+Miscellaneous2
              +I(Studying*Studying2)+I(Studying2*Studying4)
              
              +I(Miscellaneous*Miscellaneous2)
              +I(Miscellaneous2*Misceallenous4)+I(Miscellaneous*Misceallenous4)
              
              +I(Miscellaneous3**2)

              +I(Studying**2)
              +I(Studying2**2)

              
              +I(Studying*Miscellaneous3)+I(Studying2*Miscellaneous3)+
              I(Studying2*Misceallenous4)
              
              +I(Studying3*Miscellaneous2)+I(Studying3*Miscellaneous3)
              
              +I(Studying4*Miscellaneous)+I(Studying4*Miscellaneous3)
              
              , data=midterm)
#
#m1m1 s2s3 s2m2 s1m1 s1s4 s1 s1m2 m3m4 s3s3 m3
# m1m3 m2m3 s3m1 s3 s4m2 s2 s1s3 m4m4 s1m4 m2m2
# s4m4 s3m4 s2m1 s3s4 s4s4 m4


summary(final_model)
final_model<-final_model



## ----echo=FALSE---------------------------------------------------------------
##residuals

res <- resid(final_model)
plot(fitted(final_model), res)
abline(0,0)



## ----echo=FALSE---------------------------------------------------------------
#create Q-Q plot for residuals

standard_res <- rstandard(final_model)

qqnorm(standard_res)

#add a straight diagonal line to the plot
qqline(standard_res) 


## ----echo=FALSE---------------------------------------------------------------
res <- resid(final_model)
standard_res <- rstandard(final_model)

# 
  
# create data vector
# x= c(rnorm(10000))
# draw plot
plotNormalHistogram( as.numeric(as.numeric(res)), breaks = 10, prob = FALSE,
                      main = "Normal Distribution overlay on Histogram",
                      length = 10000 )
abline(v = mean(res),                       # Add line for mean
       col = "red",
       lwd = 3)



## ----echo=FALSE---------------------------------------------------------------

ggplot(midterm, aes(x=fitted(final_model) , y=standard_res )) + geom_point() + geom_smooth(se=FALSE)


## ----echo=FALSE---------------------------------------------------------------
lm_studying4 <- lm(Term.Test~Studying4, data=midterm)
res_studying4 = residuals(lm_studying4)

midterm1 = midterm %>% mutate(res_studying4)

ggplot(data=midterm1, aes(x=Studying4, y=res_studying4))+geom_point()



## ----echo=FALSE---------------------------------------------------------------
 lm_miscellaneous <- lm(Term.Test~Miscellaneous, data=midterm)
 res_miscellaneous = residuals(lm_miscellaneous)
 
 midterm1 = midterm %>% mutate(res_miscellaneous)
 
 ggplot(data=midterm1, aes(x=Miscellaneous, y=res_miscellaneous))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
 lm_miscellaneous2 <- lm(Term.Test~Miscellaneous2, data=midterm)
 res_miscellaneous2 = residuals(lm_miscellaneous2)
 
 midterm1 = midterm %>% mutate(res_miscellaneous2)
 
 ggplot(data=midterm1, aes(x=Miscellaneous2, y=res_miscellaneous2))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_istudying1studying2 <- lm(Term.Test~I(Studying*Studying2), data=midterm)
res_istudying1studying2 = residuals(lm_istudying1studying2)
midterm1 = midterm %>% mutate(res_istudying1studying2)

ggplot(data=midterm1, aes(x=I(Studying*Studying2), y=res_istudying1studying2))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_istudying2studying4 <- lm(Term.Test~I(Studying2*Studying4), data=midterm)
res_istudying2studying4 = residuals(lm_istudying2studying4)
midterm1 = midterm %>% mutate(res_istudying2studying4)

ggplot(data=midterm1, aes(x=I(Studying2*Studying4), y=res_istudying2studying4))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_misc1misc2 <- lm(Term.Test~I(Miscellaneous * Miscellaneous2), data=midterm)
res_misc1misc2 = residuals(lm_misc1misc2)
midterm1 = midterm %>% mutate(res_misc1misc2)

ggplot(data=midterm1, aes(x=I(Miscellaneous * Miscellaneous2), y=res_misc1misc2))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_misc2misc4 <- lm(Term.Test~I(Miscellaneous2 * Misceallenous4), data=midterm)
res_misc2misc4 = residuals(lm_misc2misc4)
midterm1 = midterm %>% mutate(res_misc2misc4)

ggplot(data=midterm1, aes(x=I(Miscellaneous2 * Misceallenous4), y=res_misc2misc4))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_misc1misc4 <- lm(Term.Test~I(Miscellaneous * Misceallenous4), data=midterm)
res_misc1misc4 = residuals(lm_misc1misc4)
midterm1 = midterm %>% mutate(res_misc1misc4)

ggplot(data=midterm1, aes(x=I(Miscellaneous * Misceallenous4), y=res_misc1misc4))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_misc3misc3 <- lm(Term.Test~I(Miscellaneous3 * Miscellaneous3), data=midterm)
res_misc3misc3 = residuals(lm_misc3misc3)
midterm1 = midterm %>% mutate(res_misc3misc3)

ggplot(data=midterm1, aes(x=I(Miscellaneous3 * Miscellaneous3), y=res_misc3misc3))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_studto2 <- lm(Term.Test~I(Studying^2), data=midterm)
res_studto2 = residuals(lm_studto2)
midterm1 = midterm %>% mutate(res_studto2)

ggplot(data=midterm1, aes(x=I(Studying^2), y=res_studto2))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud2to2 <- lm(Term.Test~I(Studying2^2), data=midterm)
res_stud2to2 = residuals(lm_stud2to2)
midterm1 = midterm %>% mutate(res_stud2to2)

ggplot(data=midterm1, aes(x=I(Studying2^2), y=res_stud2to2))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud2misc3 <- lm(Term.Test~I(Studying2 * Miscellaneous3), data=midterm)
res_stud2misc3 = residuals(lm_stud2misc3)
midterm1 = midterm %>% mutate(res_stud2misc3)

ggplot(data=midterm1, aes(x=I(Studying2 * Miscellaneous3), y=res_stud2misc3))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud1misc3 <- lm(Term.Test~I(Studying * Miscellaneous3), data=midterm)
res_stud1misc3 = residuals(lm_stud1misc3)
midterm1 = midterm %>% mutate(res_stud1misc3)

ggplot(data=midterm1, aes(x=I(Studying * Miscellaneous3), y=res_stud1misc3))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud3misc3 <- lm(Term.Test~I(Studying3 * Miscellaneous3), data=midterm)
res_stud3misc3 = residuals(lm_stud3misc3)
midterm1 = midterm %>% mutate(res_stud3misc3)

ggplot(data=midterm1, aes(x=I(Studying3 * Miscellaneous3), y=res_stud3misc3))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud4misc3 <- lm(Term.Test~I(Studying4 * Miscellaneous3), data=midterm)
res_stud4misc3 = residuals(lm_stud4misc3)
midterm1 = midterm %>% mutate(res_stud4misc3)

ggplot(data=midterm1, aes(x=I(Studying4 * Miscellaneous3), y=res_stud4misc3))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud4misc1 <- lm(Term.Test~I(Studying4 * Miscellaneous), data=midterm)
res_stud4misc1 = residuals(lm_stud4misc1)
midterm1 = midterm %>% mutate(res_stud4misc1)

ggplot(data=midterm1, aes(x=I(Studying4 * Miscellaneous), y=res_stud4misc1))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud3misc2 <- lm(Term.Test~I(Studying3 * Miscellaneous2), data=midterm)
res_stud3misc2 = residuals(lm_stud3misc2)
midterm1 = midterm %>% mutate(res_stud3misc2)

ggplot(data=midterm1, aes(x=I(Studying3 * Miscellaneous2), y=res_stud3misc2))+geom_point()


## ----echo=FALSE---------------------------------------------------------------
lm_stud2misc4 <- lm(Term.Test~I(Studying2 * Misceallenous4), data=midterm)
res_stud2misc4 = residuals(lm_stud2misc4)
midterm1 = midterm %>% mutate(res_stud2misc4)

ggplot(data=midterm1, aes(x=I(Studying2 * Misceallenous4), y=res_stud2misc4))+geom_point()


## ----include=FALSE------------------------------------------------------------
midterm_develop_half<-midterm %>% filter(ID < 56)
half_model<-lm(Term.Test~Studying+Studying4+
                 Miscellaneous+Misceallenous4
                +I(Studying*Studying4)+
                 I(Miscellaneous*Miscellaneous2)
                +I(Miscellaneous2*Misceallenous4)
               +I(Miscellaneous*Miscellaneous3)
                +I(Miscellaneous**2)+I(Miscellaneous2**2)+
                 I(Miscellaneous3**2)
                +I(Studying4**2), data=midterm_develop_half)


summary(half_model)
res_half <- resid(half_model)
mean(res_half)



## ----include=FALSE------------------------------------------------------------
t.test(res)


## -----------------------------------------------------------------------------
summary(poly.fit) #initial model


## -----------------------------------------------------------------------------
summary(final_model)


## -----------------------------------------------------------------------------
summary(midterm_develop_half)


## -----------------------------------------------------------------------------
mean(midterm_develop_half)

