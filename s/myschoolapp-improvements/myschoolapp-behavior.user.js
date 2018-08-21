// ==UserScript==
// @name        myschoolapp-patches
// @namespace   keyboardfire.com
// @description various improvements for myschoolapp.com
// @include     https://sjs.myschoolapp.com/*
// @version     1
// @grant       none
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

/*
 * Copyright (C) 2017  Keyboard Fire <andy@keyboardfire.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function run() {
    $(window).on('load hashchange', function() {
        if (location.hash == '#studentmyday/assignment-center') {
            // replace "change status" links with one-click buttons
            fixAssignmentStatus(0);
        } else if (/^#academicclass\/.*\/topics$/.test(location.hash)) {
            // replace animated topics page images with static images
            fixAnimatedGifs(0);
        }
    });
}
run();

function fixAssignmentStatus(tries) {
    if (!$('.assignment-status-update').length) {
        if (tries < 200) setTimeout(function() {
            fixAssignmentStatus(tries + 1);
        }, 50);
        return;
    }

    var sortDue = $('.assignment-table-sort[data-sort="date_due"]');
    if (sortDue.hasClass('muted')) {
        var ev = document.createEvent('MouseEvents');
        ev.initEvent('click', true, true);
        sortDue[0].dispatchEvent(ev);
        //sortDue.click();
        fixAssignmentStatus(0);
        return;
    }

    $('.assignment-status-update').replaceWith(function() {
        var index = $(this).data('index'), id = $(this).data('id');
        return 'TPC'.split('').map(function(x, i) {
            return $('<button>').text(x)
                .attr('class', 'btn btn-' + 'info warning success'.split(' ')[i])
                .click(function() {
                    $.ajax({
                        type: 'POST',
                        url: '/api/assignment2/assignmentstatusupdate?format=json&assignmentIndexId=' + index + '&assignmentStatus=' + (i-1),
                        beforeSend: function(req) {
                            req.setRequestHeader('RequestVerificationToken', $('#__AjaxAntiForgery input').val());
                        },
                        data: JSON.stringify({
                            assignmentIndexId: index,
                            assignmentStatus: i - 1,
                            userTaskInd: false
                        }),
                        contentType: 'application/json',
                        success: function() {
                            $('span.primary-status[data-id="'+id+'"]')
                                .removeClass('label-todo label-warning label-success primary-status')
                                .addClass('label-' + 'todo warning success'.split(' ')[i] + ' primary-status')
                                .text('To Do/In Progress/Completed'.split('/')[i]);
                        }
                    });
                });
        });
    });
}

function fixAnimatedGifs(tries) {
    if (!$('#academicclassmaincontainer .topicBox').length) {
        if (tries < 200) setTimeout(function() {
            fixAnimatedGifs(tries + 1);
        }, 50);
        return;
    }

    $('img.mediaContainer[src$="gif"]').each(function() {
        var gif = this;
        gif.style.opacity = 0;
        $(gif).on('load', function() {
            var cnv = document.createElement('canvas');
            var w = cnv.width = gif.width,
                h = cnv.height = gif.height;
            cnv.getContext('2d').drawImage(gif, 0, 0, w, h);
            gif.style.opacity = 1;
            for (var i = 0; i < gif.attributes.length; ++i) {
                cnv.setAttribute(gif.attributes[i].name,
                    gif.attributes[i].value);
            }
            gif.parentNode.replaceChild(cnv, gif);
        });
    });
}
