const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

const querystring = require('querystring')

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'})

exports.handler = function(event, context, callback) {

  /*
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({status: 'missing-information'})
    })
  } */

  // Get data
  event.body = 'timestamp=1523623261&token=0b1fe9af8f8cbdec5fde16142daf5b5f319ca3316d0e5fef42&signature=88815c57d0b0ffebdfd238e1a4cb5d61e9180f8d2e17af5b21ee7712fb9fded7&domain=app.subscribe.love&From=Tommy+Vedvik+%3Ctommyvedvik%40gmail.com%3E&Return-Path=%3Ctommyvedvik%40gmail.com%3E&X-Readdle-Message-Id=2ed377d4-cfae-488c-a165-8042bf26cda1%40Spark&X-Google-Dkim-Signature=v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3D1e100.net%3B+s%3D20161025%3B++++++++h%3Dx-gm-message-state%3Adate%3Afrom%3Ato%3Amessage-id%3Asubject%3Amime-version%3B++++++++bh%3D10nBDYDKJqx5Z0JFRzAqzKwIh1ZJZe%2BuFhmUJxx8C18%3D%3B++++++++b%3DrEBAWG3a6cZg%2B4tTtELOLcDFd9KaHru6oCmxk%2BSLY0dqDmZiBEoBgm0zDal0cacv0M+++++++++gR%2B2P0oOrfFJ5aHbxiQ14ENh5UvU2UFcRrLZ1pejCRePnc8csEoEnr3FS%2BZL28%2BZH2%2Bl+++++++++ZMzSnN8v%2FmkJD5OKfQcc%2FmQZapCYsCw10fyfqVFR%2FTwpeOX%2BsAZhCmC2eYh3SOkwkKmt+++++++++uAmcu7EKctUCn%2FbQoL4H%2FaGeIuqjqTigiv51lPyIwMeULOXxA%2Bf0MBXnDAruE90gqKVv+++++++++h1TomOhd6FCq8FSQ5s1sbDAZRQZqZ2dlLJwOXuVVDU3AubvBOaSTICxTz3rITj95Q31%2F+++++++++nKsw%3D%3D&To=tommyvedvik%2Bbills%40app.subscribe.love&Dkim-Signature=v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3Dgmail.com%3B+s%3D20161025%3B++++++++h%3Ddate%3Afrom%3Ato%3Amessage-id%3Asubject%3Amime-version%3B++++++++bh%3D10nBDYDKJqx5Z0JFRzAqzKwIh1ZJZe%2BuFhmUJxx8C18%3D%3B++++++++b%3DAHaRdy%2BiETve8H8D74DThZA%2BqB0pYfE9d57S61ZmTe6TGUoMfcVcYP4tfoyeLizBJg+++++++++rk%2Bq1bBukLLnAy2AJ7KSjkKFEB%2BOCuptvyc1Ep6oTxAxLgN43lkGhlBtZHNTu61Isstp+++++++++nOdFg6z4OO2UPmt9VDUj2pS0pJsx5ty0CbMB6v0uH0Q0KdvSJIykz66%2BGoIBL7rQTtR0+++++++++%2BepfNv5CBp3rx3KN9Yol%2BbS%2FrzArVJ%2BpiYaklzsyKxNSu1imxcXeG46PiECCO62WhqYX+++++++++bG5u7xQYOwkPNSLzmRiHMoF1g9SlmJfdOYjmxXZ7EMfGwshJCKzzeYV9z6KbocwVOkUM+++++++++RnKA%3D%3D&subject=hah&from=Tommy+Vedvik+%3Ctommyvedvik%40gmail.com%3E&X-Received=by+10.80.190.6+with+SMTP+id+a6mr20188051edi.269.1523622657271%3B++++++++Fri%2C+13+Apr+2018+05%3A30%3A57+-0700+%28PDT%29&Date=Fri%2C+13+Apr+2018+14%3A30%3A49+%2B0200&Message-Id=%3C2ed377d4-cfae-488c-a165-8042bf26cda1%40Spark%3E&Mime-Version=1.0&Received=from+mail-wm0-f52.google.com+%28mail-wm0-f52.google.com+%5B74.125.82.52%5D%29+by+mxa.mailgun.org+with+ESMTP+id+5ad0a303.7f363ce051f0-smtp-in-n01%3B+Fri%2C+13+Apr+2018+12%3A30%3A59+-0000+%28UTC%29&Received=by+mail-wm0-f52.google.com+with+SMTP+id+x4so3863402wmh.5++++++++for+%3Ctommyvedvik%2Bbills%40app.subscribe.love%3E%3B+Fri%2C+13+Apr+2018+05%3A30%3A58+-0700+%28PDT%29&Received=from+%5B192.168.1.86%5D+%28%5B62.92.157.79%5D%29++++++++by+smtp.gmail.com+with+ESMTPSA+id+w1sm3263569edk.82.2018.04.13.05.30.56++++++++for+%3Ctommyvedvik%2Bbills%40app.subscribe.love%3E++++++++%28version%3DTLS1_2+cipher%3DECDHE-RSA-AES128-GCM-SHA256+bits%3D128%2F128%29%3B++++++++Fri%2C+13+Apr+2018+05%3A30%3A56+-0700+%28PDT%29&message-url=https%3A%2F%2Fsw.api.mailgun.net%2Fv3%2Fdomains%2Fapp.subscribe.love%2Fmessages%2FeyJwIjpmYWxzZSwiayI6Ijg1ZGI2YmRlLWVlNTUtNDc4YS1iNDcwLWVlYmJmODcwYzgxMCIsInMiOiJlZDdmOGVmZGFhIiwiYyI6InRhbmtiIn0%3D&message-headers=%5B%5B%22X-Mailgun-Incoming%22%2C+%22Yes%22%5D%2C+%5B%22X-Envelope-From%22%2C+%22%3Ctommyvedvik%40gmail.com%3E%22%5D%2C+%5B%22Received%22%2C+%22from+mail-wm0-f52.google.com+%28mail-wm0-f52.google.com+%5B74.125.82.52%5D%29+by+mxa.mailgun.org+with+ESMTP+id+5ad0a303.7f363ce051f0-smtp-in-n01%3B+Fri%2C+13+Apr+2018+12%3A30%3A59+-0000+%28UTC%29%22%5D%2C+%5B%22Received%22%2C+%22by+mail-wm0-f52.google.com+with+SMTP+id+x4so3863402wmh.5++++++++for+%3Ctommyvedvik%2Bbills%40app.subscribe.love%3E%3B+Fri%2C+13+Apr+2018+05%3A30%3A58+-0700+%28PDT%29%22%5D%2C+%5B%22Dkim-Signature%22%2C+%22v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3Dgmail.com%3B+s%3D20161025%3B++++++++h%3Ddate%3Afrom%3Ato%3Amessage-id%3Asubject%3Amime-version%3B++++++++bh%3D10nBDYDKJqx5Z0JFRzAqzKwIh1ZJZe%2BuFhmUJxx8C18%3D%3B++++++++b%3DAHaRdy%2BiETve8H8D74DThZA%2BqB0pYfE9d57S61ZmTe6TGUoMfcVcYP4tfoyeLizBJg+++++++++rk%2Bq1bBukLLnAy2AJ7KSjkKFEB%2BOCuptvyc1Ep6oTxAxLgN43lkGhlBtZHNTu61Isstp+++++++++nOdFg6z4OO2UPmt9VDUj2pS0pJsx5ty0CbMB6v0uH0Q0KdvSJIykz66%2BGoIBL7rQTtR0+++++++++%2BepfNv5CBp3rx3KN9Yol%2BbS%2FrzArVJ%2BpiYaklzsyKxNSu1imxcXeG46PiECCO62WhqYX+++++++++bG5u7xQYOwkPNSLzmRiHMoF1g9SlmJfdOYjmxXZ7EMfGwshJCKzzeYV9z6KbocwVOkUM+++++++++RnKA%3D%3D%22%5D%2C+%5B%22X-Google-Dkim-Signature%22%2C+%22v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3D1e100.net%3B+s%3D20161025%3B++++++++h%3Dx-gm-message-state%3Adate%3Afrom%3Ato%3Amessage-id%3Asubject%3Amime-version%3B++++++++bh%3D10nBDYDKJqx5Z0JFRzAqzKwIh1ZJZe%2BuFhmUJxx8C18%3D%3B++++++++b%3DrEBAWG3a6cZg%2B4tTtELOLcDFd9KaHru6oCmxk%2BSLY0dqDmZiBEoBgm0zDal0cacv0M+++++++++gR%2B2P0oOrfFJ5aHbxiQ14ENh5UvU2UFcRrLZ1pejCRePnc8csEoEnr3FS%2BZL28%2BZH2%2Bl+++++++++ZMzSnN8v%2FmkJD5OKfQcc%2FmQZapCYsCw10fyfqVFR%2FTwpeOX%2BsAZhCmC2eYh3SOkwkKmt+++++++++uAmcu7EKctUCn%2FbQoL4H%2FaGeIuqjqTigiv51lPyIwMeULOXxA%2Bf0MBXnDAruE90gqKVv+++++++++h1TomOhd6FCq8FSQ5s1sbDAZRQZqZ2dlLJwOXuVVDU3AubvBOaSTICxTz3rITj95Q31%2F+++++++++nKsw%3D%3D%22%5D%2C+%5B%22X-Gm-Message-State%22%2C+%22ALQs6tDs8YalmvOcYJzeWgEbyBovExUOpQJzauxd83%2FEYk%2F8vvM7hPpT%5CtGt1pDCu2CwQYn1uifnwuevQiY4lM%22%5D%2C+%5B%22X-Google-Smtp-Source%22%2C+%22AIpwx4%2FDBOtsO9cSX2EZRSm214Ec%2FskqGcAmyXWjCtuv6UYH2Ubfld8ZYf70KCcOga5ABDhLGab2yw%3D%3D%22%5D%2C+%5B%22X-Received%22%2C+%22by+10.80.190.6+with+SMTP+id+a6mr20188051edi.269.1523622657271%3B++++++++Fri%2C+13+Apr+2018+05%3A30%3A57+-0700+%28PDT%29%22%5D%2C+%5B%22Return-Path%22%2C+%22%3Ctommyvedvik%40gmail.com%3E%22%5D%2C+%5B%22Received%22%2C+%22from+%5B192.168.1.86%5D+%28%5B62.92.157.79%5D%29++++++++by+smtp.gmail.com+with+ESMTPSA+id+w1sm3263569edk.82.2018.04.13.05.30.56++++++++for+%3Ctommyvedvik%2Bbills%40app.subscribe.love%3E++++++++%28version%3DTLS1_2+cipher%3DECDHE-RSA-AES128-GCM-SHA256+bits%3D128%2F128%29%3B++++++++Fri%2C+13+Apr+2018+05%3A30%3A56+-0700+%28PDT%29%22%5D%2C+%5B%22Date%22%2C+%22Fri%2C+13+Apr+2018+14%3A30%3A49+%2B0200%22%5D%2C+%5B%22From%22%2C+%22Tommy+Vedvik+%3Ctommyvedvik%40gmail.com%3E%22%5D%2C+%5B%22To%22%2C+%22tommyvedvik%2Bbills%40app.subscribe.love%22%5D%2C+%5B%22Message-Id%22%2C+%22%3C2ed377d4-cfae-488c-a165-8042bf26cda1%40Spark%3E%22%5D%2C+%5B%22Subject%22%2C+%22hah%22%5D%2C+%5B%22X-Readdle-Message-Id%22%2C+%222ed377d4-cfae-488c-a165-8042bf26cda1%40Spark%22%5D%2C+%5B%22Mime-Version%22%2C+%221.0%22%5D%2C+%5B%22Content-Type%22%2C+%22multipart%2Falternative%3B+boundary%3D%5C%225ad0a2ff_8138641_11448%5C%22%22%5D%5D&recipient=tommyvedvik%2Bbills%40app.subscribe.love&sender=tommyvedvik%40gmail.com&X-Mailgun-Incoming=Yes&X-Gm-Message-State=ALQs6tDs8YalmvOcYJzeWgEbyBovExUOpQJzauxd83%2FEYk%2F8vvM7hPpT%09Gt1pDCu2CwQYn1uifnwuevQiY4lM&X-Envelope-From=%3Ctommyvedvik%40gmail.com%3E&Content-Type=multipart%2Falternative%3B+boundary%3D%225ad0a2ff_8138641_11448%22&X-Google-Smtp-Source=AIpwx4%2FDBOtsO9cSX2EZRSm214Ec%2FskqGcAmyXWjCtuv6UYH2Ubfld8ZYf70KCcOga5ABDhLGab2yw%3D%3D&Subject=hah&body-plain=hah%0D%0A%0D%0ABest+regards%2C%0D%0ATommy+Vedvik%0D%0A&body-html=%3Chtml+xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%3E%0D%0A%3Chead%3E%0D%0A%3Ctitle%3E%3C%2Ftitle%3E%0D%0A%3C%2Fhead%3E%0D%0A%3Cbody%3E%0D%0A%3Cdiv+name%3D%22messageBodySection%22+style%3D%22font-size%3A+14px%3B+font-family%3A+-apple-system%2C+BlinkMacSystemFont%2C+sans-serif%3B%22%3Ehah%3C%2Fdiv%3E%0D%0A%3Cdiv+name%3D%22messageSignatureSection%22+style%3D%22font-size%3A+14px%3B+font-family%3A+-apple-system%2C+BlinkMacSystemFont%2C+sans-serif%3B%22%3E%3Cbr+%2F%3E%0D%0ABest+regards%2C%0D%0A%3Cdiv%3ETommy+Vedvik%3C%2Fdiv%3E%0D%0A%3C%2Fdiv%3E%0D%0A%3C%2Fbody%3E%0D%0A%3C%2Fhtml%3E%0D%0A&stripped-html=%3Chtml+xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%3E%0A%3Chead%3E%0A%3Ctitle%3E%3C%2Ftitle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Cdiv+name%3D%22messageBodySection%22+style%3D%22font-size%3A+14px%3B+font-family%3A+-apple-system%2C+BlinkMacSystemFont%2C+sans-serif%3B%22%3Ehah%3C%2Fdiv%3E%0A%3Cdiv+name%3D%22messageSignatureSection%22+style%3D%22font-size%3A+14px%3B+font-family%3A+-apple-system%2C+BlinkMacSystemFont%2C+sans-serif%3B%22%3E%3Cbr+%2F%3E%0ABest+regards%2C%0A%3Cdiv%3ETommy+Vedvik%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A&stripped-text=hah&stripped-signature=Best+regards%2C%0D%0ATommy+Vedvik'
  const data = querystring.parse(event.body)

  // Get user from email
  let user = data.recipient
  let folder = null
  user = user.match(/^([^@]*)@/)[1]

  // Get folder
  folder = user.split("+")[1]
  if(folder) user = user.split("+")[0]

  // console.log(data)

  console.log('USER:' +user)
  console.log('FOLDER:' +folder)

  // Add to database
  console.log('DATE:' +data.timestamp)
  console.log('SUBJECT:' +data.subject)
  console.log('FROM:' +data.from)
  console.log('SENDER:' +data.sender)
  console.log('HTML:'+ JSON.stringify(data['body-html']))
  console.log('PLAIN:'+ JSON.stringify(data['body-plain']))
  console.log('TEXT:'+ JSON.stringify(data['stripped-text']))

  // Success
  callback(null, {
    statusCode,
    headers,
    body: JSON.stringify({status: 'Successful'})
  })
}
